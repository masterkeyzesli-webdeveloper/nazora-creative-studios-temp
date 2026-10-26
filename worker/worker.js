/**
 * Cloudflare Worker for the Nazora Creative Studios site.
 *
 * - Serves the built static assets (React SPA).
 * - Applies SPA fallback so deep links and refreshes work on client-side routes.
 * - Handles POST /api/chat with the same server-side handler used in development,
 *   so the AI provider key never reaches the browser.
 *
 * Required secret for the live assistant: OPENAI_API_KEY
 *   (set in the hosting panel after the first deploy)
 * Optional: AI_BASE_URL, AI_MODEL
 */
import { createChatHandler } from './chatHandler.mjs';

const isAssetRequest = (pathname) =>
  pathname !== '/' && pathname.split('/').pop().includes('.');

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, 405);
      }
      const raw = await request.text();
      const handler = createChatHandler({ getEnv: () => env });
      const clientKey = request.headers.get('cf-connecting-ip') || 'unknown';
      const result = await handler(raw, clientKey);
      return json(result.body, result.status);
    }

    const response = await env.ASSETS.fetch(request);

    // SPA fallback: unknown extensionless routes render the app shell, which
    // then resolves the route client-side (or shows the built-in 404 page).
    if (response.status === 404 && request.method === 'GET' && !isAssetRequest(url.pathname)) {
      const shell = await env.ASSETS.fetch(new URL('/', request.url));
      if (shell.ok) {
        return new Response(shell.body, { status: 200, headers: shell.headers });
      }
    }

    return response;
  },
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

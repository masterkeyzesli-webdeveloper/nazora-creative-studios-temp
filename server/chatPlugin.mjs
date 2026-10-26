/**
 * Server-side AI chat endpoint.
 *
 * The LLM API key never reaches the browser: it is read from the server
 * environment (OPENAI_API_KEY) and used only inside this module.
 *
 * In development this plugin mounts the endpoint on the Vite dev server at
 * POST /api/chat. For production, deploy the same handler (see server/README.md)
 * as a Worker/Edge function or any Node server and set the same environment
 * variables.
 *
 * Required environment variables:
 *   OPENAI_API_KEY   - API key for the model provider (required for live answers)
 *   AI_BASE_URL      - optional, defaults to https://freebuff.com/api/v1/paid
 *   AI_MODEL         - optional, defaults to gpt-4o-mini
 */
import { createChatHandler } from './chatHandler.mjs';

export function chatApiPlugin() {
  const handler = createChatHandler({
    getEnv: () => ({
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      AI_BASE_URL: process.env.AI_BASE_URL,
      AI_MODEL: process.env.AI_MODEL,
    }),
  });

  return {
    name: 'nazora-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let raw = '';
        req.on('data', (chunk) => {
          raw += chunk;
          if (raw.length > 32 * 1024) {
            req.destroy();
          }
        });
        req.on('end', async () => {
          try {
            const result = await handler(raw, req.socket.remoteAddress || 'unknown');
            res.statusCode = result.status;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.end(JSON.stringify(result.body));
          } catch {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'unexpected' }));
          }
        });
      });
    },
  };
}

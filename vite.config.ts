import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { chatApiPlugin } from './server/chatPlugin.mjs';

export default defineConfig({
  plugins: [react(), tailwindcss(), chatApiPlugin()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});

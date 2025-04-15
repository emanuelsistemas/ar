import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-static-html',
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url === '/') {
            req.url = '/index.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3001,
    host: true
  },
  preview: {
    port: 3000
  },
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
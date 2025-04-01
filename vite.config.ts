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
            req.url = '/static.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5002,
    host: true
  },
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

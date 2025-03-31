import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    host: true
  },
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
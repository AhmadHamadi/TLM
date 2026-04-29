import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    watch: {
      // Ignore nested Next.js / build / vendor directories so the file
      // watcher never tries to lstat their cache files (Windows-prone).
      ignored: [
        '**/TLMportal/**',
        '**/.next/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/.vercel/**',
        '**/.git/**'
      ]
    }
  }
});

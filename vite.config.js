import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page build: the marketing site (index.html) plus the
      // standalone ROI calculator (calculator.html → /calculator).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        calculator: fileURLToPath(new URL('./calculator.html', import.meta.url))
      }
    }
  },
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

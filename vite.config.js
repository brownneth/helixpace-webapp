import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),                // Landing Page
        login: resolve(__dirname, 'pages/login/index.html'),   // Login Page
        entry: resolve(__dirname, 'pages/app/entry/index.html'),     // Data Entry
        results: resolve(__dirname, 'pages/app/results/index.html'), // Results
        history: resolve(__dirname, 'pages/app/history/index.html'), // Search/History
      },
    },
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Keeps URLs relative, useful when deploying to a subfolder
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your Flask backend
        changeOrigin: true,              // Modifies the origin header to match the target
        secure: false,                   // Accepts self-signed certs if using HTTPS
      },
    },
  },
});

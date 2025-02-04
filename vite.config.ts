import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests from /api to the Google Maps API
      '/api': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        // Remove the /api prefix before forwarding the request
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

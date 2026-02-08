// Add this to your vite.config.js to improve dev performance

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false // Disable error overlay for better performance
    }
  },
  build: {
    sourcemap: false, // Disable sourcemaps in production
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios', 'lucide-react']
  }
})

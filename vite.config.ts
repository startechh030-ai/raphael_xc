import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    // Allow the sandboxed preview host (*.e2b.app) to load the dev server.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Keep the Three.js runtime in its own chunk so the page paints first.
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('@react-three')) return 'r3f'
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion'))
            return 'motion'
        },
      },
    },
  },
})

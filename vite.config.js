import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Vendor code changes rarely, so keep it in its own cacheable files.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('@phosphor-icons')) return 'icons'
          if (id.includes('motion')) return 'motion'
          if (id.includes('react-router')) return 'router'
          if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
        },
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Every stylesheet gets breakpoints, mixins and z-index scale for free.
        additionalData: `@use "@/styles/abstracts" as *;\n`,
      },
    },
  },
})

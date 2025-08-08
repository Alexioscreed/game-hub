import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html',
      external: [],
      onwarn: () => {} // Suppress all warnings
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  base: './'  // Use relative paths for deployment
})

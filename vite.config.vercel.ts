import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2015', // More compatible target
    rollupOptions: {
      input: './index.html',
      external: [],
      onwarn: () => {}, // Suppress all warnings
      output: {
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  base: '/',  // Use absolute paths
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})

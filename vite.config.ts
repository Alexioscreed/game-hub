import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress certain warnings during build
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      }
    }
  },
  esbuild: {
    // Don't fail on TypeScript issues
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    }
  }
})
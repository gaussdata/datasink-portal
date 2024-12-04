import { defineConfig } from 'vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/stat',
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  server: {
    proxy: {
      '^/api/*': {
        target: 'http://www.gausszhou.top/api',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: "./dist/stat",
    rollupOptions: {
      output: {
        manualChunks(module) {
          return 'main';
        }
      }
    }
  }
})

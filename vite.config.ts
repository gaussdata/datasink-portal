import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  server: {
    proxy: {
      "^/api/datasink/*": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/datasink/, ""),
      },
    },
  },
  build: {
    outDir: "./dist",
    rollupOptions: {
      output: {
        manualChunks(module) {
          return "main";
        },
      },
    },
  },
});

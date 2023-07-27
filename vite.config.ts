import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import path from "path"
import wasm from "vite-plugin-wasm"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          rehype: ["rehype"],
          unified: ["unified"],
          "rehype-prism-plus": ["rehype-prism-plus"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
})

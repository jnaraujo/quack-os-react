import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import wasm from "vite-plugin-wasm"
import prefresh from "@prefresh/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    prefresh(),
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
      react: "preact/compat",
    },
  },
})

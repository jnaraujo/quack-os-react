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
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  resolve: {
    alias: {
      react: "preact/compat",
    },
  },
})

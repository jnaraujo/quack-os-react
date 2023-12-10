import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import wasm from "vite-plugin-wasm"
import prefresh from "@prefresh/vite"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    prefresh(),
    wasm(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
    }),
    preact(),
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

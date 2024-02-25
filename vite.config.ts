import { defineConfig } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import react from "@vitejs/plugin-react"
import wasm from "vite-plugin-wasm"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasm(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
    }),
    react(),
  ],
  worker: {
    format: "es",
  },
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("refractor")) {
            return "refractor"
          }
        },
      },
    },
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
})

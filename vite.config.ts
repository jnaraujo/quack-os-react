import { defineConfig, splitVendorChunkPlugin } from "vite"
import { visualizer } from "rollup-plugin-visualizer"
import path from "path"
import prefresh from "@prefresh/vite"
import wasm from "vite-plugin-wasm"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasm(),
    prefresh(),
    splitVendorChunkPlugin(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
})

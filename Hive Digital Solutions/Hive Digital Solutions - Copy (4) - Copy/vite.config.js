import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "js",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "src/site/main.jsx"),
      output: {
        entryFileNames: "hero-react.js",
        format: "iife",
        name: "HiveSite",
        inlineDynamicImports: true
      }
    }
  }
});

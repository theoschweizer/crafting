import { defineConfig } from 'vite'
import copy from "rollup-plugin-copy";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  rollupOptions: {
    input: 'src/contentScript.jsx', // The entry point for your content script
    output: {
      format: 'iife', // You need an immediately invoked function expression for content scripts
      file: 'dist/contentScript.bundle.js',
    },
  },
  plugins: [react(), copy({
    targets: [
      { src: ["src/background.js", "src/content-script.js"], dest: "dist" }, // Copy background.js to the output folder
    ],
    hook: "writeBundle", // Run this plugin after the bundle is created
  })],
})

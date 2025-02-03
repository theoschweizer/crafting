import { defineConfig } from 'vite'
import copy from "rollup-plugin-copy";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copy({
    targets: [
      { src: ["src/background.js"], dest: "dist" }, // Copy background.js to the output folder
    ],
    hook: "writeBundle", // Run this plugin after the bundle is created
  })],
  build: {
    outDir: "dist", // Output the build to the dist folder
    rollupOptions: {
      input: {
        content: 'src/contentScript.tsx', // Entry for content script
      },
      output: {
        format: 'iife', // Ensures the script runs immediately
        entryFileNames: '[name].bundle.js', // Output filename
      },
    },
  }
})

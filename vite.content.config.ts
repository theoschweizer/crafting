import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Output the build to the dist folder
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: 'src/contentScript.tsx', // Entry for content script
      },
      output: {
        format: 'iife', // Ensures the script runs immediately
        entryFileNames: 'content.bundle.js', // Output filename
      },
    },
  }
})

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // Output the build to the dist folder
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: 'src/popup/index.tsx', // Popup React entry      
        },
      output: {
        format: 'iife', // Ensures the script runs immediately
        entryFileNames: 'popup.bundle.js', // Output filename
      },
    },
  }
})

import { defineConfig, optimizeDeps } from 'vite'
import copy from "rollup-plugin-copy";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
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
            popup: 'src/popup/index.tsx', // Entry for your popup React app          
            content: 'src/contentScript.tsx',  // Content script entry point
            background: 'src/background.js'    // Background script entry point
        }
    }
  },  
  optimizeDeps: {
    exclude: ['@tabler/icons-react']
  }
})

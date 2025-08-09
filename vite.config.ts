import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // Use the new JSX transform
    jsxRuntime: 'automatic'
  })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          canvas: ['html2canvas'],
          sanitizer: ['dompurify']         
          pdf: ['html2pdf.js']
        }
      }
    }
  }
})


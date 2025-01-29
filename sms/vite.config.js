import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@mui/x-date-pickers': '@mui/x-date-pickers/modern',
    },
  },
  plugins: [react(),
    tailwindcss(),
    
  ],
})

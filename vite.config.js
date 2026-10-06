import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5050,
    strictPort: false, // Busca automáticamente el siguiente puerto libre si 5050 estuviera ocupado
  },
  preview: {
    port: 5050,
    strictPort: false,
  }
})


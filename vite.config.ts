import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isPreview = process.env.BASE44_PREVIEW_MODE === '1'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: isPreview ? true : undefined,
  },
})

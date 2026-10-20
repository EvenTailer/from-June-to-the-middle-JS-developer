import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // SPA-режим: history fallback, любой неизвестный путь (/practice/loops, /module/react)
  // отдаёт index.html, а маршрутизация происходит в браузере (react-router).
  appType: 'spa',
})

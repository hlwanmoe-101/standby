import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({ registerType: 'autoUpdate' ,injectRegister: 'auto',
    workbox: {
      cleanupOutdatedCaches: false,
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

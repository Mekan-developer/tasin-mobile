import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      // УБЕРИТЕ эти строки или создайте sw.js
      // strategies: 'injectManifest',
      // srcDir: 'public',
      // filename: 'sw.js',

      // Или, если хотите injectManifest, создайте public/sw.js:
      strategies: 'injectManifest',
      srcDir: 'src', // Лучше поместить в src
      filename: 'sw.js', // Файл в src/sw.js

      includeAssets: ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png', 'apple-touch-icon.png'],

      manifest: {
        name: 'Täsin Mobile',
        short_name: 'TM',
        description: 'Premium Mobile Shop App',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone', // ДОБАВЬТЕ ЭТО
        start_url: '/', // ДОБАВЬТЕ ЭТО
        orientation: 'portrait', // ДОБАВЬТЕ ЭТО
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },

      // ДОБАВЬТЕ эти настройки:
      devOptions: {
        enabled: true, // Включает PWA в dev-режиме
        type: 'module' // Использует module type для разработки
      },

      // ДОБАВЬТЕ для лучшей интеграции:
      injectRegister: 'auto',

      pwaAssets: {
        disabled: true,
        config: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '192.168.1.19',
    port: 5173
  }
})

// Базовый Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')
  return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Пропускаем, работаем через workbox
})
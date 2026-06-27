// sw.js – Service Worker для кеширования и офлайн-работы
const CACHE_NAME = 'biathlon-market-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/ratings.html',
  '/manifest.json',
  '/images/logo-light.png',
  '/images/logo-dark.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

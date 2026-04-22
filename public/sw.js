const CACHE_NAME = 'uixplor-offline-cache-v6';
const OFFLINE_URL = '/offline';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all([
        cache.add(OFFLINE_URL).catch(() => { }),
        cache.add('/offline.html').catch(() => { })
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(OFFLINE_URL)) || (await cache.match('/offline.html'));
      })
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || !response.ok) {
            return response;
          }

          if (url.pathname.startsWith('/_next/static/') || event.request.destination === 'font') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(async () => {
          return await caches.match(event.request);
        })
    );
  }
});


// UIXplor Service Worker
// Caches core pages and serves them when offline

const CACHE_NAME = 'uixplor-v1';

// Pages/assets to pre-cache on install
const PRECACHE_URLS = [
	'/',
	'/offline',
	'/404',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
		)
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	// Only handle GET requests for same-origin navigation
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);

	// For navigation requests (page loads), use network-first with offline fallback
	if (event.request.mode === 'navigate') {
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					// Clone and cache successful responses
					if (response && response.status === 200) {
						const clone = response.clone();
						caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
					}
					return response;
				})
				.catch(() =>
					// Network failed — serve cached version or /offline page
					caches.match(event.request).then(
						(cached) => cached || caches.match('/offline')
					)
				)
		);
		return;
	}

	// For static assets (JS, CSS, images): cache-first strategy
	if (url.origin === self.location.origin) {
		event.respondWith(
			caches.match(event.request).then(
				(cached) =>
					cached ||
					fetch(event.request).then((response) => {
						if (response && response.status === 200) {
							const clone = response.clone();
							caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
						}
						return response;
					})
			)
		);
	}
});

var CACHE_NAME = 'tarih-sinav-v1';
var urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Install event
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(function (response) {
                // Clone the response and cache it
                var responseClone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(function () {
                return caches.match(event.request);
            })
    );
});

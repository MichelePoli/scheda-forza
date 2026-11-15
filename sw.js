var CACHE = 'scheda-forza';
var FILES = ['./', 'index.html', 'manifest.json', 'icon-180.png', 'fonts/fonts.css',
  'fonts/barlow-400.woff2', 'fonts/barlow-500.woff2', 'fonts/barlow-600.woff2',
  'fonts/barlow-condensed-600.woff2', 'fonts/barlow-condensed-700.woff2'];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then(function (response) {
      var copy = response.clone();
      caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
      return response;
    }).catch(function () {
      return caches.match(event.request, { ignoreSearch: true });
    })
  );
});

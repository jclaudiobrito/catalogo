const CACHE_NAME = "Catálogo-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/application/css/style.css",
  "/application/css/fronte.css",
  "/app.js",
  "/icons/icon-128x128.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Instala e faz cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa SW e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Busca no cache ou rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

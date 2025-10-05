const CACHE_NAME = "dpi-sk-cache-v1";
const ASSETS_TO_CACHE = [
    "/index.html",
    "/choix_structure.html",
    "/login_structure.html",
    "/menu.html",
    "/data.js",
    "/style.css",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png"
];

// Installation du service worker et mise en cache
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activation du service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

// Interception des requêtes pour servir le cache si hors ligne
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
            .catch(() => caches.match("/index.html"))
    );
});
const cacheName = "workout-app-v1";
const staticAssets = [
  "./",
  "index.html",
  "styles.css",
  "script.js",
  "changeDirection.mp3",
  "icon-192x192.png",
  // Add other assets you want to cache
];

// Install and cache assets
self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// Fetch assets from cache or network
self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

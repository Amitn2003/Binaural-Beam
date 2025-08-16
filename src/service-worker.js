// Very basic cache — cache-first for app shell
const CACHE_NAME = "binaural-beam-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))
      )
    )
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  // cache-first for GET html/js/css
  if (request.method === "GET") {
    e.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((resp) => {
            const respClone = resp.clone();
            // Cache only GET & basic same-origin
            if (
              request.url.startsWith(self.location.origin) &&
              resp.status === 200
            ) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, respClone);
              });
            }
            return resp;
          })
        );
      })
    );
  }
});
console.log("From serviceworker utils")

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("binaural-cache").then((cache) => {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

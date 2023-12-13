const staticDevCoffee = "msf-portal-v1";
const assets = [
  "/",
  "/index.html",
  "/styles/style.css",
  "/scripts/events.js",
  "/scripts/router.js",
  "/scripts/main.js",
  "/favicon.ico",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/home.html",
  "/pages/login.html",
  "/pages/register.html",
  "/pages/programs.html",
  "/pages/services.html"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
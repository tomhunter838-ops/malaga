/* Hunters to Málaga — offline cache. Bump VERSION on every deploy. */
var VERSION = "malaga-v2";
var CODE = ["./", "index.html", "app.js", "plan.js"];
var ASSETS = [
  "hero.jpg", "family.jpg",
  "us-beach.jpg", "us-swing.jpg", "us-gardens.jpg", "us-arcade.jpg", "us-lunch.jpg",
  "head-tom.png", "head-chelsea.png", "head-oliver.png",
  "icon-180.png", "icon-512.png",
  "fonts/sans-var.woff2", "fonts/serif.woff2", "fonts/serif-italic.woff2"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) { return c.addAll(CODE.concat(ASSETS)); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== VERSION) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Cache-first for everything same-origin; the code files also refresh quietly
   in the background so a redeploy is picked up on the next open.
   Tick sync is cross-origin and never touches this. */
self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  var isCode = /(\/|\.html|app\.js|plan\.js)$/.test(url.pathname);
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) {
        if (isCode) e.waitUntil(
          fetch(e.request).then(function (res) {
            if (res && res.ok) return caches.open(VERSION).then(function (c) { return c.put(e.request, res); });
          }).catch(function () {})
        );
        return hit;
      }
      return fetch(e.request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          e.waitUntil(caches.open(VERSION).then(function (c) { return c.put(e.request, copy); }));
        }
        return res;
      }).catch(function () { return new Response("Offline", { status: 503 }); });
    })
  );
});

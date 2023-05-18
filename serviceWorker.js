const staticHSBCSO = "hsbc-life-so"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/logo.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticHSBCSO).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})
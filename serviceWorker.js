const staticHSBCSO = "hsbc-life-so"
const assets = [
    /*"/",*/
    "/hsbc-life-so/index.html",
    "/hsbc-life-so/style.css",
    "/hsbc-life-so/app.js",
    "/hsbc-life-so/logo.png",
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
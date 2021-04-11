const Cache_name = "static_cache"
const Static_assets = {
    '/index.html'
}

async function preCache() {
    const cache = await cache.open(Cache_name)
    return cache.addAll(Static_assets)
}

self.addEventListener('install', event => {
    console.log("[sw] installed");
    event.waitUntil(preCache())
})
self.addEventListener('activate', event => {
    console.log("[sw] actived");
})

self.addEventListener('fetch', event => {
    console.log("[sw] fetched");
})
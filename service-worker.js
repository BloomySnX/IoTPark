const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
    'index.html',
    'script.js'
]

async function preCache() {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}

self.addEventListener('install', event => {
    console.log("installed");
    event.waitUntil(preCache())
})
self.addEventListener('activate', event => {
    console.log("actived");
})
async function fetchAssets(event) {
    try {
        const response = await fetch(event.request)
        return response
    } catch (err) {
        const cache = await caches.open(Cache_name)
        return cache.match(event.request)
    }
}

self.addEventListener('fetch', event => {
    console.log("fetched");
    event.respondWith(fetchAssets(event))
})
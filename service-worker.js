/*
const Cache_name = "static_cache"
const Static_assets = [
    '/index.html'
]

async function preCache() {
    const cache = await caches.open(Cache_name)
    return cache.addAll(Static_assets)
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
})
*/

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache-v1')
        .then(function(cache) {
            return cache.addAll(['/', '/styles/main.css', '/scripts/main.js']);
        })
    );
});
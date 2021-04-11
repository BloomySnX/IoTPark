self.addEventListener('install', event => {
    console.log("[sw] installed");
})
self.addEventListener('activate', event => {
    console.log("[sw] actived");
})

self.addEventListener('fetch', event => {
    console.log("[sw] fetched");
})
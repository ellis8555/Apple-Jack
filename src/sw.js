self.addEventListener('install', ev => {
    ev.waitUntil(self.skipWaiting())
})

let isHaxDataUpdated

self.addEventListener('message', ev => {
    const { type, payload } = ev.data
    if(type === 'LAST_MODIFIED'){
        isHaxDataUpdated = payload
    }
})

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (ev) => {
    const req = ev.request;
    const url = req.url;

    if (url.endsWith('haxData.js')) {
            ev.respondWith(
                caches.open('javascripts').then((cache) => {
                    // 1. First, check if a cached version exists
                    return cache.match(req).then((cachedResponse) => {
                        // If cached, return it immediately
                        if (cachedResponse) return cachedResponse;

                        // 2. If not cached, fetch fresh from network
                        return fetch(req).then((fetchResponse) => {
                            if (!fetchResponse.ok) throw new Error('Bad response');

                            // 3. Clone response before caching
                            const responseClone = fetchResponse.clone();

                            // 4. Delete ALL previously cached .js files (but keep current request)
                            return cache.keys().then((keys) => {
                                return Promise.all(
                                    keys.filter(key => key.url != req.url).map((key) => cache.delete(key))
                                ).then(() => {
                                    // 5. Cache the new JS file
                                    return cache.put(req, responseClone);
                                });
                            }).then(() => fetchResponse);
                        }).catch((err) => {
                            console.error('Fetch failed:', err);
                            return fetch(req); // Fallback to network
                        });
                    });
                })
            );
    } else if(url.endsWith('.png')) {
        ev.respondWith(
            caches.open('pngFiles').then(cache => {
                // 1. First, check if a cached version exists
                return cache.match(req).then(cachedResponse => {
                // If cached, return it immediately
                if (cachedResponse) return cachedResponse;
                // 2. If not cached, fetch fresh from network
                return fetch(req).then(fetchedResponse => {
                    const responseClone = fetchedResponse.clone()
                // 3 cache the png file
                    cache.put(req, responseClone)
                    return fetchedResponse
                }).catch((err) => {
                        console.error('Fetch failed:', err);
                        return fetch(req); // Fallback to network
                    });
                })
            })
        )
    } else if (url.endsWith('haxData.json')){
                // there is new updated data so do a fetch and cache
        if(isHaxDataUpdated){
            ev.respondWith(
                // 1. get or create cache
                caches.open('haxData').then((cache) => {
                    // 2. perform fetch
                        return fetch(req).then((fetchResponse) => {
                            if (!fetchResponse.ok) throw new Error('Bad response');

                            // 3. Clone response before caching
                            const responseClone = fetchResponse.clone();

                            // 4. Delete ALL previously cached .js files (but keep current request)
                            return cache.keys().then((keys) => {
                                return Promise.all(
                                    keys.filter(key => key.url != req.url).map((key) => cache.delete(key))
                                ).then(() => {
                                    // 5. Cache the new JS file
                                    return cache.put(req, responseClone);
                                });
                            }).then(() => fetchResponse);
                        }).catch((err) => {
                            console.error('Fetch failed:', err);
                            return fetch(req); // Fallback to network
                        });
                })
            );
        // check to see if data is in the cache
        } else {
            ev.respondWith(
                caches.open('haxData').then((cache) => {
                    // 1. First, check if a cached version exists
                    return cache.match(req).then((cachedResponse) => {
                        // If cached, return it immediately
                        if (cachedResponse) return cachedResponse;

                        // 2. If not cached, fetch fresh from network
                        return fetch(req).then((fetchResponse) => {
                            if (!fetchResponse.ok) throw new Error('Bad response');

                            // 3. Clone response before caching
                            const responseClone = fetchResponse.clone();

                            // 4. Delete ALL previously cached .js files (but keep current request)
                            return cache.keys().then((keys) => {
                                return Promise.all(
                                    keys.filter(key => key.url != req.url).map((key) => cache.delete(key))
                                ).then(() => {
                                    // 5. Cache the new JS file
                                    return cache.put(req, responseClone);
                                });
                            }).then(() => fetchResponse);
                        }).catch((err) => {
                            console.error('Fetch failed:', err);
                            return fetch(req); // Fallback to network
                        });
                    });
                })
            );
        }
    } else if(url.startsWith("main") && url.endsWith(".css")) {
        ev.respondWith(
            caches.open('cssFiles').then((cache) => {

                // 1. First, check if a cached version exists
                return cache.match(req).then((cachedResponse) => {
                    // If cached, return it immediately
                    if (cachedResponse) return cachedResponse;
                    // 2. If not cached, fetch fresh from network
                    return fetch(req).then((fetchResponse) => {
                        
                        if (!fetchResponse.ok) throw new Error('Bad response');

                        // 3. Clone response before caching
                        const responseClone = fetchResponse.clone();

                        // 4. Delete ALL previously cached .js files (but keep current request)
                        return cache.keys().then((keys) => {
                            return Promise.all(
                                keys.filter(key => key.url != req.url).map((key) => cache.delete(key))
                            ).then(() => {
                                // 5. Cache the new JS file
                                return cache.put(req, responseClone);
                            });
                        }).then(() => fetchResponse);
                    }).catch((err) => {
                        console.error('Fetch failed:', err);
                        return fetch(req); // Fallback to network
                    });
                });
            })
        );
    } else {
        // Non-JS files: normal fetch
        ev.respondWith(fetch(req));
    }
});

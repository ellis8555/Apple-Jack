self.addEventListener('install', (ev) => {
    ev.waitUntil(
        self.skipWaiting()
    )
})

self.addEventListener('fetch', (ev) => {
        ev.respondWith(
            caches.match(ev.request).then(cacheRes => {
                if(cacheRes) return cacheRes
                return fetch(ev.request).then(fetchResponse => {
                    if(ev.request.url.endsWith('.js')){
                        const responseClone = fetchResponse.clone();
                        return caches.open('javascripts').then(cache => {
                            // First delete any old JS files
                            return cache.keys().then(keys => {
                                const jsFiles = keys.filter(key => 
                                    key.url.endsWith('.js') && 
                                    key.url !== ev.request.url  // Don't delete current file
                                );
                                
                                // Delete all old JS files
                                return Promise.all(
                                    jsFiles.map(oldFile => cache.delete(oldFile))
                                ).then(() => {
                                    // Now cache the new file
                                    return cache.put(ev.request, responseClone);
                                });
                            }).then(() => fetchResponse);
                        });
                }  else if(ev.request.url.endsWith('.png')){
                            const responseClone = fetchResponse.clone()
                            return caches.open('logoImages').then(cache => {
                                return cache.put(ev.request, responseClone).then(() => {
                                    return fetchResponse
                                })
                            })
                        }
                        return fetchResponse
                    })
                
            })
        )
})
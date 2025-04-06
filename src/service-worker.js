// src/service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
  });
  
  // Cache files
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.open('static-cache').then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  });
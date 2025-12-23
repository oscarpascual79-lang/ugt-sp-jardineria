const CACHE_NAME = 'ugt-sp-jardineria-v1.0.0';
const urlsToCache = [
  './app-completa.html',
  './manifest.json',
  './app-icon.svg',
  // Añadir otros recursos si los hay
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Archivos en caché');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('Service Worker: Instalación completada');
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('Service Worker: Activación completada');
      return self.clients.claim();
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si el archivo está en caché, devolverlo
        if (response) {
          console.log('Service Worker: Sirviendo desde caché:', event.request.url);
          return response;
        }

        // Si no está en caché, hacer petición de red
        console.log('Service Worker: Petición de red:', event.request.url);
        return fetch(event.request).then(function(response) {
          // Verificar si la respuesta es válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(function() {
          // Si falla la red, mostrar página offline básica
          if (event.request.destination === 'document') {
            return new Response(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>UGT-SP Jardinería - Offline</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 2rem; 
                    background: linear-gradient(135deg, #228B22, #32CD32);
                    color: white;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  }
                  h1 { color: #c41e3a; background: white; padding: 1rem; border-radius: 8px; }
                  p { font-size: 1.2rem; margin: 1rem 0; }
                  button { 
                    background: #c41e3a; 
                    color: white; 
                    border: none; 
                    padding: 1rem 2rem; 
                    border-radius: 8px; 
                    font-size: 1rem; 
                    cursor: pointer; 
                  }
                </style>
              </head>
              <body>
                <h1>UGT-SP Convenio Jardinería</h1>
                <p>📱 La aplicación está disponible offline</p>
                <p>🌐 No hay conexión a internet</p>
                <button onclick="window.location.reload()">Reintentar</button>
              </body>
              </html>
            `, {
              headers: { 'Content-Type': 'text/html' }
            });
          }
        });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notificaciones push (opcional para futuras actualizaciones)
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: './app-icon.svg',
    badge: './app-icon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver cambios',
        icon: './app-icon.svg'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: './app-icon.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('UGT-SP Convenio Jardinería', options)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('./app-completa.html')
    );
  }
});
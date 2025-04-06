   // serviceWorkerRegistration.js

   const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/)
  );

  export function register(config) {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }

      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        if (isLocalhost) {
          // Check if a service worker still exists or not.
          checkValidServiceWorker(swUrl, config);
        } else {
          // Just register service worker
          registerValidSW(swUrl, config);
        }
      });
    }
  }

  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched.
                // It's the perfect time to display a "New content is available; please refresh."
                console.log(
                  'New content is available; please refresh.'
                );
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use."
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error during service worker registration:', error);
      });
  }

  function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
      method: 'HEAD',
    })
      .then((response) => {
        // Ensure service worker exists, and that we really are on the right path.
        if (
          response.status === 404 ||
          response.headers.get('content-type').indexOf('javascript') === -1
        ) {
          // No service worker found. Most likely, the current directory is not a React app.
          navigator.serviceWorker.ready.then(() => {
            // The existing service worker is controlling this page.
            if (config && config.onUpdate) {
              config.onUpdate(null);
            }
          });
        } else {
          // Service worker found. Proceed as normal.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
      });
  }
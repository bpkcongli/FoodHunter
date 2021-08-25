import {clientsClaim} from 'workbox-core';
import {registerRoute} from 'workbox-routing';
import {precacheAndRoute} from 'workbox-precaching';
import {StaleWhileRevalidate, NetworkFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import CONFIG from './globals/config';

self.skipWaiting();
clientsClaim();

// Caching App Shell
precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute([
  {url: '/index.html', revision: '1'},
]);

// Caching all resources from API
registerRoute(
    ({url}) => {
      return url.origin.includes(CONFIG.BASE_URL) && url.pathname.includes('/detail');
    },
    new NetworkFirst({
      cacheName: 'network-resource-cache',
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 24 * 60 * 60,
        }),
      ],
    }),
);

registerRoute(
    ({url}) => {
      return url.origin.includes(CONFIG.BASE_URL) || CONFIG.NETWORK_RESOURCE.includes(url.origin);
    },
    new StaleWhileRevalidate({
      cacheName: 'network-resource-cache',
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 24 * 60 * 60,
        }),
      ],
    }),
);

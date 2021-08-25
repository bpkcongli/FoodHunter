import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/skeleton.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import './views/component/restaurant-item/RestaurantName';
import './views/component/restaurant-item/RestaurantDescription';
import './views/component/restaurant-detail/RestaurantDetail';
import './views/component/restaurant-review/RestaurantReview';

import App from './views/App';

const app = new App({
  body: document.querySelector('body'),
  appBar: document.querySelector('.app-bar'),
  button: document.querySelector('#openDrawerButton'),
  drawer: document.querySelector('#drawer'),
  hero: document.querySelector('.hero'),
  content: document.querySelector('#mainContent'),
  footer: document.querySelector('footer'),
});

window.onhashchange = () => {
  app.renderPage();
};

window.onload = () => {
  app.renderPage();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log(`SW registered. Scope is ${registration.scope}`))
        .catch((error) => console.error(`SW registered failed: ${error}`));
  }
};

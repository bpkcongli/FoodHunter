import RestaurantApiSource from '../../data/restaurantapi-source';
import {createRestaurantItemTemplate} from '../templates/template-creator.js';

class Home {
  constructor() {
    this._restaurants = null;
    this._pages = 1;
    this._maxPages = 3;
  }

  async render() {
    return `
      <section class="content">
      </section>
    `;
  }

  _appendRestaurantItems() {
    const mainContent = document.querySelector('#mainContent');
    mainContent.style.height = 'auto';
    const startIndex = this._pages * 6;
    const restaurantsContainer = document.querySelector('#restaurants');
    this._restaurants.slice(startIndex, startIndex+6).forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
    this._pages++;

    if (this._pages > this._maxPages) {
      const showMoreRestaurants = document.querySelector('#showMoreRestaurants');
      mainContent.querySelector('.content').removeChild(showMoreRestaurants);
    }
  }

  _renderContentWithSkeleton(title) {
    return `
      <div class="content-title">
        <h2>${title}</h2>
      </div>
      <div id="restaurants" class="restaurants">
        ${[...Array(6).keys()].map((i) => '<div class="skeleton"></div>').join('')}
      </div>
    `;
  }

  _renderContentWithoutSkeleton() {
    return `
      <div class="content-title">
        <h2>Explore Restaurant</h2>
      </div>
      <div id="restaurants" class="restaurants"></div>
    `;
  }

  async afterRender() {
    const content = document.querySelector('.content');
    content.innerHTML += this._renderContentWithSkeleton('Explore Restaurant');
    this._restaurants = await RestaurantApiSource.getAllRestaurants();
    content.innerHTML = this._renderContentWithoutSkeleton();
    const restaurantsContainer = document.querySelector('#restaurants');
    this._restaurants.slice(0, 6).forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
    content.innerHTML += `
      <div id="showMoreRestaurants">
        <button type="button" aria-label="show more restaurants">Show More</button>
      </div>
    `;
    document.querySelector('#showMoreRestaurants button').addEventListener('click', () => {
      this._appendRestaurantItems();
    });
  }
};

export default Home;

import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import {createRestaurantItemTemplate} from '../templates/template-creator';
import Home from './home';

class Favorite extends Home {
  constructor() {
    super();
  }

  _renderContentWithoutSkeleton() {
    return `
      <div class="content-title">
        <h2>Your Favorite Restaurant</h2>
      </div>
    `;
  }

  async afterRender() {
    const content = document.querySelector('.content');
    content.innerHTML += this._renderContentWithSkeleton('Your Favorite Restaurant');
    this._restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    this._maxPages = Math.floor(this._restaurants.length / 6);
    content.innerHTML = this._renderContentWithoutSkeleton();

    if (this._restaurants.length > 0) {
      content.innerHTML += `<div id="restaurants" class="restaurants"></div>`;
      const restaurantsContainer = document.querySelector('#restaurants');
      this._restaurants.slice(0, 6).forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
      if (this._restaurants.length > 6) {
        content.innerHTML += '<div id="showMoreRestaurants"><button type="button">Show More</button></div>';
        document.querySelector('#showMoreRestaurants button').addEventListener('click', () => {
          this._appendRestaurantItems();
        });
      }
    } else {
      content.innerHTML += '<p>You have not liked any restaurants yet.</p>';
    }
    const mainContent = document.querySelector('#mainContent');
    mainContent.style.height = 'auto';
  }
};

export default Favorite;

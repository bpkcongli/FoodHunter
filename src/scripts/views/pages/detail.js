import UrlParser from '../../routes/url-parser';
import RestaurantApiSource from '../../data/restaurantapi-source';
import {createRestaurantDetailTemplate} from '../templates/template-creator.js';

class Detail {
  async render() {
    return `
    <section class="content">
      <article id="restaurant" class="restaurant"></article>
    </section>
    `;
  }

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = `
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    `;
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantApiSource.getRestaurantDetail(url.id);
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    const mainContent = document.querySelector('#mainContent');
    mainContent.style.height = 'auto';
  }
};

export default Detail;

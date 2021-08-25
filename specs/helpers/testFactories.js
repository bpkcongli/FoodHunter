import {fixture, html} from '@open-wc/testing';
import '../../src/scripts/views/component/restaurant-detail/RestaurantDetailInfo';

const createRestaurantDetailInfo = async (restaurantInfo) => {
  return await fixture(html`
    <restaurant-detail-info .restaurantInfo=${restaurantInfo}>
    </restaurant-detail-info>
  `);
};

export {createRestaurantDetailInfo};

import CONFIG from './config';

const API_ENDPOINT = {
  allRestaurants: `${CONFIG.BASE_URL}/list`,
  restaurantDetail: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  postRestaurantReview: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;

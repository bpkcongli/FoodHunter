import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantApiSource {
  static async getAllRestaurants() {
    const response = await fetch(API_ENDPOINT.allRestaurants);
    const responseJSON = await response.json();
    return responseJSON.restaurants;
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.restaurantDetail(id));
    const responseJSON = await response.json();
    return responseJSON.restaurant;
  }

  static async postRestaurantReview(request) {
    const response = await fetch(API_ENDPOINT.postRestaurantReview, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: request,
    });
    const responseJSON = await response.json();
    return responseJSON.error;
  }
}

export default RestaurantApiSource;

import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import ModalInitiator from '../utils/modal-initiator';
import {
  createAddToFavoritesButton,
  createRemoveFromFavoritesButton,
} from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({likeButtonContainer, restaurant}) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderLikeButton();
  },

  async _renderLikeButton() {
    if (await this._isRestaurantExistOnDatabase()) {
      this._likeButtonContainer.innerHTML = createRemoveFromFavoritesButton();
      this._likeButtonContainer
          .querySelector('[aria-label="remove this restaurant from your favorite"]')
          .addEventListener('click', () => {
            this._deleteFavoriteRestaurant();
          });
    } else {
      this._likeButtonContainer.innerHTML = createAddToFavoritesButton();
      this._likeButtonContainer
          .querySelector('[aria-label="add this restaurant to your favorite"]')
          .addEventListener('click', () => {
            this._addFavoriteRestaurant();
          });
    }
  },

  async _isRestaurantExistOnDatabase() {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(this._restaurant.id);
    return !!restaurant;
  },

  async _addFavoriteRestaurant() {
    const restaurantId = await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
    if (restaurantId) ModalInitiator.show('Restaurant added successfully to your Favorite');
    await this._renderLikeButton();
  },

  async _deleteFavoriteRestaurant() {
    await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
    ModalInitiator.show('Restaurant removed successfully from your Favorite');
    await this._renderLikeButton();
  },
};

export default LikeButtonInitiator;

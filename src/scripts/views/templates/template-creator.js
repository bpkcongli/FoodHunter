import RestaurantDataFormatter from '../../utils/restaurant-data-formatter';
import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => {
  const {
    id,
    name,
    city,
    pictureId,
    description,
    rating,
  } = restaurant;

  const getStarRating = (rating) => {
    const rate = Math.round(rating * 2);
    const fullStar = Math.floor(rate / 2);
    const halfStar = rate % 2;
    return {fullStar, halfStar};
  };

  const {fullStar, halfStar} = getStarRating(rating);
  const fullStarArray = [...Array(fullStar).keys()];
  const halfStarArray = [...Array(halfStar).keys()];

  return `
    <article class="restaurant-item">
      <div class="restaurant-image">
        <img
          class="lazyload"
          data-src="${CONFIG.BASE_IMAGE_SMALL_URL}/${pictureId}"
          alt="${name}">
        <div class="restaurant-city">${city}</div>
      </div>
      <div class="restaurant-info">
        <div class="restaurant-rating">
          <div class="restaurant-rating-star">
            ${fullStarArray.map((i) => `
              <i 
                class="fa fa-star" 
                aria-hidden="true">
              </i>
            `).join('')}${halfStarArray.map((i) => `
              <i 
                class="fa fa-star-half-o"
                aria-hidden="true">
              </i>
            `)}
          </div>
          <span>${rating}</span>
        </div>
        <restaurant-name id="${id}" name="${name}"></restaurant-name>
        <restaurant-description description="${description}"></restaurant-description>
      </div>
    </div>
  `;
};

const createRestaurantDetailTemplate = (restaurant) => {
  const formattedRestaurantData = RestaurantDataFormatter.format(restaurant);
  return `
    <restaurant-detail 
      restaurantData='${JSON.stringify(formattedRestaurantData)}'>
    </restaurant-detail>
    <restaurant-review
      id="${restaurant.id}"
      reviews='${JSON.stringify(formattedRestaurantData.customerReviews)}'>
    </restaurant-review>
  `;
};

const createAddToFavoritesButton = () => {
  return `
    <button
      id="addToFavoritesButton"
      type="button"
      aria-label="add this restaurant to your favorite"
    ><i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
  `;
};

const createRemoveFromFavoritesButton = () => {
  return `
    <button
      id="removeFromFavoritesButton"
      type="button"
      aria-label="remove this restaurant from your favorite"
    ><i class="fa fa-heart" aria-hidden="true"></i>
    </button>
  `;
};

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createAddToFavoritesButton,
  createRemoveFromFavoritesButton,
};

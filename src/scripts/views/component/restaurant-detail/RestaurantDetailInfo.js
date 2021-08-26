import {LitElement, html, css} from 'lit-element';
import './RestaurantDetailCategory';
import './RestaurantDetailDescription';
import './RestaurantDetailMenus';
import LikeButtonInitiator from '../../../utils/like-button-initiator';

class RestaurantDetailInfo extends LitElement {
  static get properties() {
    return {
      restaurantInfo: {type: Object},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
      }

      .restaurant-detail-info {
        flex-basis: 100%;
        height: 100%;
        padding: 5%;
      }

      .restaurant-detail-name {
        align-items: center;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        font-size: 0.85em;
      }

      button {
        align-items: center;
        background-color: #0f4c75;
        border: none;
        border-radius: 50%;
        bottom: 20px;
        color: white;
        cursor: pointer;
        display: flex;
        font-size: 1em;
        font-weight: bold;
        height: 44px;
        justify-content: center;
        margin-left: 20px;
        position: fixed;
        right: 20px;
        width: 44px;
      }

      .restaurant-rating {
        display: flex;
        flex-direction: row;
        font-size: 1.2em;
        font-weight: bold;
      }

      .restaurant-rating-star {
        margin-right: 10px;
      }

      .fa.fa-star, .fa.fa-star-half-o {
        color: #f8ce0b;
        font-display: block;
      }

      .restaurant-detail-location {
        margin: 10px 0;
        font-size: 0.85em;
      }

      .restaurant-detail-location .fa {
        font-size: 1.1em;
        margin-right: 10px;
      }

      @media screen and (min-width: 576px) {
        .restaurant-detail-name {
          font-size: 0.9em;
        }

        .restaurant-detail-location {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 640px) {
        .restaurant-detail-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        button {
          position: static;
        }
      }

      @media screen and (min-width: 768px) {
        .restaurant-detail-name {
          font-size: 1em;
        }

        .restaurant-detail-location {
          font-size: 0.95em;
        }
      }

      @media screen and (min-width: 900px) {
        .restaurant-detail-name {
          font-size: 1.1em;
        }

        .restaurant-detail-location {
          font-size: 1em;
        }

        button {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-detail-name {
          font-size: 1.2em;
        }

        .restaurant-detail-location {
          font-size: 1.1em;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-detail-name {
          font-size: 1.3em;
        }

        .restaurant-detail-location {
          font-size: 1.15em;
        }

        button {
          font-size: 0.8em;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  getStarRating(rating) {
    const rate = Math.round(rating * 2);
    const fullStar = Math.floor(rate / 2);
    const halfStar = rate % 2;
    return {fullStar, halfStar};
  }

  render() {
    const {
      name,
      categories = [],
      rating = 0,
      address,
      description,
      dishes,
      beverages,
    } = this.restaurantInfo;

    const {fullStar, halfStar} = this.getStarRating(rating);
    const fullStarArray = [...Array(fullStar).keys()];
    const halfStarArray = [...Array(halfStar).keys()];

    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="restaurant-detail-info">
        <div class="restaurant-detail-name">
          <h2>${name}</h2>
          <div class="restaurant-detail-button"></div>
        </div>
        <restaurant-detail-category 
          .categories='${categories}'>
        </restaurant-detail-category>
        <div class="restaurant-rating">
          <div class="restaurant-rating-star">
            ${fullStarArray.map((i) => html`
              <i 
                class="fa fa-star" 
                aria-hidden="true">
              </i>
            `)}${halfStarArray.map((i) => html`
              <i 
                class="fa fa-star-half-o"
                aria-hidden="true">
              </i>
            `)}
          </div>
          <span>${rating}</span>
        </div>
        <div class="restaurant-detail-location">
          <i class="fa fa-map-marker" aria-hidden="true"></i>${address}
        </div>
        <restaurant-detail-description description="${description}">
        </restaurant-detail-description>
        <restaurant-detail-menus 
          menus="${dishes}"
          category="Dishes">
        </restaurant-detail-menus>
        <restaurant-detail-menus 
          menus="${beverages}"
          category="Beverages">
        </restaurant-detail-menus>
      </div>
    `;
  }

  async firstUpdated() {
    await LikeButtonInitiator.init({
      likeButtonContainer: this.shadowRoot.querySelector('.restaurant-detail-button'),
      restaurant: this.restaurantInfo,
    });
  }

  async getUpdateComplete() {
    await super.getUpdateComplete();
    await LikeButtonInitiator.init({
      likeButtonContainer: this.shadowRoot.querySelector('.restaurant-detail-button'),
      restaurant: this.restaurantInfo,
    });
  }
}

customElements.get('restaurant-detail-info') || customElements.define('restaurant-detail-info', RestaurantDetailInfo);

import {LitElement, html, css} from 'lit-element';
import CONFIG from '../../../globals/config.js';
import './RestaurantDetailFigure';
import './RestaurantDetailInfo';

class RestaurantDetail extends LitElement {
  static get properties() {
    return {
      restaurantData: {type: Object},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .restaurant-detail {
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      @media screen and (min-width: 640px) {
        .restaurant-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 650px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    const {
      name,
      city,
      pictureId,
    } = this.restaurantData;

    return html`
      <section class="restaurant-detail">
        <restaurant-detail-figure
          src="${CONFIG.BASE_IMAGE_SMALL_URL}/${pictureId}"
          alt="${name}"
          city="${city}"
        ></restaurant-detail-figure>
        <restaurant-detail-info
          restaurantInfo='${JSON.stringify(this.restaurantData)}'
        ></restaurant-detail-info>
      </section>
    `;
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

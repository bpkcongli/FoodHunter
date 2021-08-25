import {LitElement, html, css} from 'lit-element';

class RestaurantRating extends LitElement {
  static get properties() {
    return {
      rating: {type: Number},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
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

      .fa {
        color: #f8ce0b;
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
    const {fullStar, halfStar} = this.getStarRating(this.rating);
    const fullStarArray = [...Array(fullStar).keys()];
    const halfStarArray = [...Array(halfStar).keys()];

    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
        <span>${this.rating}</span>
      </div>
    `;
  }
}

customElements.get('restaurant-rating') || customElements.define('restaurant-rating', RestaurantRating);

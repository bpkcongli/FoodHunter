import {LitElement, html, css} from 'lit-element';

class RestaurantDetailCategory extends LitElement {
  static get properties() {
    return {
      categories: {type: Array},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .restaurant-detail-categories {
        display: flex;
        margin-bottom: 10px;
      }

      .restaurant-detail-category-item {
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 0.8em;
        margin-right: 5px;
        padding: 3px;
      }

      @media screen and (min-width: 900px) {
        .restaurant-detail-category-item {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-detail-category-item {
          font-size: 0.95em;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-detail-category-item {
          font-size: 1em;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="restaurant-detail-categories">
        ${this.categories.map((category) =>
    html`<div class="restaurant-detail-category-item">${category}</div>`)}
      </div>
    `;
  }
}

customElements.get('restaurant-detail-category') || customElements.define('restaurant-detail-category', RestaurantDetailCategory);

import {LitElement, html, css} from 'lit-element';

class RestaurantDetailMenus extends LitElement {
  static get properties() {
    return {
      menus: {type: String},
      category: {type: String},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      .restaurant-detail-menus {
        font-size: 0.8em;
        margin-bottom: 10px;
      }

      .restaurant-detail-menus span {
        font-weight: bold;
      }

      @media screen and (min-width: 576px) {
        .restaurant-detail-menus {
          font-size: 0.85em;
        }
      }

      @media screen and (min-width: 768px) {
        .restaurant-detail-menus {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 900px) {
        .restaurant-detail-menus {
          font-size: 0.95em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-detail-menus {
          font-size: 1em;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-detail-menus {
          font-size: 1.05em;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="restaurant-detail-menus">
        <span>${this.category}</span>: ${this.menus}
      </div>
    `;
  }
}

customElements.get('restaurant-detail-menus') || customElements.define('restaurant-detail-menus', RestaurantDetailMenus);

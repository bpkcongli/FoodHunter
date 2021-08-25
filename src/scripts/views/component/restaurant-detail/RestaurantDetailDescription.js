import {LitElement, html, css} from 'lit-element';

class RestaurantDetailDescription extends LitElement {
  static get properties() {
    return {
      description: {type: String},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .restaurant-detail-description {
        margin-bottom: 10px;
        font-size: 0.75em;
      }

      @media screen and (min-width: 450px) {
        .restaurant-detail-description {
          font-size: 0.8em;
        }
      }

      @media screen and (min-width: 768px) {
        .restaurant-detail-description {
          font-size: 0.85em;
        }
      }

      @media screen and (min-width: 900px) {
        .restaurant-detail-description {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-detail-description {
          font-size: 0.95em;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-detail-description {
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
      <div class="restaurant-detail-description">${this.description}</div>
    `;
  }
}

customElements.get('restaurant-detail-description') || customElements.define('restaurant-detail-description', RestaurantDetailDescription);

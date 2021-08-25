import {LitElement, html, css} from 'lit-element';

class RestaurantDetailLocation extends LitElement {
  static get properties() {
    return {
      location: {type: String},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
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
        .restaurant-detail-location {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 768px) {
        .restaurant-detail-location {
          font-size: 0.95em;
        }
      }

      @media screen and (min-width: 900px) {
        .restaurant-detail-location {
          font-size: 1em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-detail-location {
          font-size: 1.1em;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-detail-location {
          font-size: 1.15em;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="restaurant-detail-location">
        <i class="fa fa-map-marker" aria-hidden="true"></i>${this.location}
      </div>
    `;
  }
}

customElements.get('restaurant-detail-location') || customElements.define('restaurant-detail-location', RestaurantDetailLocation);

import {LitElement, html, css} from 'lit-element';

class RestaurantDetailFigure extends LitElement {
  static get properties() {
    return {
      src: {type: String},
      alt: {type: String},
      city: {type: String},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      .restaurant-detail-figure {
        border-radius: 5px 5px 0 0;
        background-color: #999;
        flex-basis: 100%;
        height: 210px;
        min-height: 210px;
        position: relative;
        width: 100%;
      }

      .restaurant-detail-figure img {
        border-radius: 5px 5px 0 0;
        height: 100%;
        min-height: 210px;
        object-position: center;
        object-fit: cover;
        width: 100%;
      }

      .restaurant-detail-city {
        background-color: #1b262c;
        border-radius: 5px;
        color: white;
        margin: 2%;
        padding: 2%;
        position: absolute;
        top: 0;
      }

      @media screen and (min-width: 640px) {
        .restaurant-detail-figure {
          border-radius: 5px 0 0 5px;
          height: 100%;
          width: 100%;
        }

        .restaurant-detail-figure img {
          border-radius: 5px 0 0 5px;
          height: 100%;
          width: 100%;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="restaurant-detail-figure">
        <img src="${this.src}" alt="${this.alt}">
        <div class="restaurant-detail-city">${this.city}</div>
      </div>
    `;
  }
}

customElements.define('restaurant-detail-figure', RestaurantDetailFigure);

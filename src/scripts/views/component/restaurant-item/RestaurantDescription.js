import {LitElement, html, css} from 'lit-element';

class RestaurantDescrition extends LitElement {
  static get properties() {
    return {
      description: {type: String},
    };
  }

  static get styles() {
    return css`
      .restaurant-description {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="restaurant-description">${this.description}</div>
    `;
  }
}

customElements.define('restaurant-description', RestaurantDescrition);

import {LitElement, html, css} from 'lit-element';

class RestaurantName extends LitElement {
  static get properties() {
    return {
      id: {type: String},
      name: {type: String},
    };
  }

  static get styles() {
    return css`
      .restaurant-name {
        display: flex;
        font-size: 1.5em;
        font-weight: bold;
        min-height: 44px;
        min-width: 44px;
      }

      .restaurant-name a {
        color: #1b262c;
        padding: 10px 0;
        text-decoration: none;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="restaurant-name">
        <a href="/#/detail/${this.id}">${this.name}</a>
      </div>
    `;
  }
}

customElements.define('restaurant-name', RestaurantName);

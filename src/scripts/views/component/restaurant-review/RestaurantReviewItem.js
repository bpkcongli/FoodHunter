import {LitElement, html, css} from 'lit-element';

class RestaurantReviewItem extends LitElement {
  static get properties() {
    return {
      name: {type: String},
      date: {type: String},
      review: {type: String},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .restaurant-review-item {
        border-bottom: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        padding: 0 0 10px;
      }

      .restaurant-review-header {
        align-items: center;
        display: flex;
        flex-direction: row;
      }

      .restaurant-review-avatar-name {
        align-items: center;
        display: flex;
        flex-basis: 50%;
        flex-direction: row;
      }

      .avatar-image {
        border-radius: 50%;
        vertical-align: middle;
        height: 40px;
        width: 40px;
      }

      .restaurant-review-name, .restaurant-review-date, .restaurant-review-detail {
        font-size: 0.8em;
      }

      .restaurant-review-name {
        font-weight: bold;
        margin-left: 10px;
      }

      .restaurant-review-date {
        color: #666;
        display: flex;
        flex-basis: 50%;
        justify-content: flex-end;
      }

      .restaurant-review-detail {
        margin-top: 5px;
      }

      @media screen and (min-width: 576px) {
        .restaurant-review-name, .restaurant-review-date, .restaurant-review-detail {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 768px) {
        .restaurant-review-name, .restaurant-review-date, .restaurant-review-detail {
          font-size: 0.8em;
        }
      }

      @media screen and (min-width: 840px) {
        .restaurant-review-name, .restaurant-review-date, .restaurant-review-detail {
          font-size: 0.85em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-review-name, .restaurant-review-date, .restaurant-review-detail {
          font-size: 0.9em;
        }

        .avatar-image {
          height: 45px;
          width: 45px;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-review-name, .restaurant-review-date, .restaurant-review-detail {
          font-size: 1em;
        }

        .avatar-image {
          height: 50px;
          width: 50px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  getRandomAvatarImage() {
    return `avatars/avatars-${Math.ceil(Math.random() * 9)}.png`;
  }

  render() {
    return html`
      <div class="restaurant-review-item">
        <div class="restaurant-review-header">
          <div class="restaurant-review-avatar-name">
            <img src="${this.getRandomAvatarImage()}" alt="" class="avatar-image">
            <div class="restaurant-review-name">${this.name}</div>
          </div>
          <div class="restaurant-review-date">${this.date}</div>
        </div>
        <div class="restaurant-review-detail">
          ${this.review}
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-review-item', RestaurantReviewItem);

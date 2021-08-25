import {LitElement, html, css} from 'lit-element';
import RestaurantApiSource from '../../../data/restaurantapi-source';
import ModalInitiator from '../../../utils/modal-initiator';
import './RestaurantReviewItem';

class RestaurantReview extends LitElement {
  static get properties() {
    return {
      id: {type: String},
      reviews: {type: Array},
      currentName: {type: String},
      currentReview: {type: String},
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .restaurant-review {
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        padding: 10px 0;;
        width: 100%;
      }

      .restaurant-review-list {
        height: 40vh;
        overflow-x: auto;
        margin-bottom: 10px;
        padding: 3% 5%;
        width: 100%;
      }

      .restaurant-post-review {
        border-top: 1px solid #ccc;
        padding: 5%;
        width: 100%;
      }

      .restaurant-post-review-title {
        font-size: 1em;
        margin-bottom: 15px;
      }

      .restaurant-post-review-name, .restaurant-post-review-text {
        margin-bottom: 20px;
        width: 100%;
      }

      .restaurant-post-review-text label, .restaurant-post-review-name label {
        font-size: 0.8em;
        font-weight: bold;
        margin-bottom: 10px;
      }

      #reviewerNameInput, #reviewerTextInput {
        border: none;
        border-bottom: 1px solid grey;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8em;
        outline: none;
        padding: 5px;
        width: 100%;
      }

      #reviewerNameInput {
        padding: 5px 0;
      }

      #reviewerTextInput {
        border-radius: 3px;
        border: 1px solid grey;
        height: 75px;
        padding: 5px;
        resize: none;
      }

      .restaurant-post-review-submit {
        width: 100%;
      }

      .restaurant-post-review-submit button {
        background-color: #1b262c;
        border: none;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        font-size: 0.9em;
        font-weight: bold;
        min-height: 44px;
        padding: 8px;
        width: 100%;
      }

      @media screen and (min-width: 576px) {
        .restaurant-post-review-text label, .restaurant-post-review-name label,
        #reviewerNameInput, #reviewerTextInput {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 640px) {
        .restaurant-post-review-title {
          font-size: 1.1em;
        }
      }

      @media screen and (min-width: 768px) {
        .restaurant-review {
          flex-direction: row;
          height: 40vh;
        }

        .restaurant-review-list {
          border-right: 1px solid #ccc;
          flex-basis: 50%;
          height: 100%;
          margin: 0;
          padding: 2% 3%;
        }

        .restaurant-post-review {
          border: none;
          display: flex;
          flex-basis: 50%;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding: 3%;
        }

        .restaurant-post-review-text label, .restaurant-post-review-name label,
        #reviewerNameInput, #reviewerTextInput {
          font-size: 0.8em;
        }
      }

      @media screen and (min-width: 840px) {
        .restaurant-post-review-text label, .restaurant-post-review-name label,
        #reviewerNameInput, #reviewerTextInput {
          font-size: 0.85em;
        }
      }

      @media screen and (min-width: 1080px) {
        .restaurant-post-review-text label, .restaurant-post-review-name label,
        #reviewerNameInput, #reviewerTextInput {
          font-size: 0.9em;
        }
      }

      @media screen and (min-width: 1280px) {
        .restaurant-post-review-text label, .restaurant-post-review-name label,
        #reviewerNameInput, #reviewerTextInput {
          font-size: 1em;
        }

        .restaurant-post-review-title {
          font-size: 1.2em;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  currentNameHandler(event) {
    this.currentName = event.target.value;
  }

  currentReviewHandler(event) {
    this.currentReview = event.target.value;
  }

  async submitReviewHandler() {
    if (!window.navigator.onLine) {
      ModalInitiator.show('Sorry, review can\'t be added because you are offline');
      return;
    }
    if (this.currentName === '' || this.currentReview === '') {
      ModalInitiator.show('Review name and review message cannot be empty');
      return;
    }
    const bodyRequest = JSON.stringify({
      id: this.id,
      name: this.currentName,
      review: this.currentReview,
    });
    const response = await RestaurantApiSource.postRestaurantReview(bodyRequest);
    if (!response) {
      ModalInitiator.show('Your review has been added successfully');
      this.reviews = (await RestaurantApiSource.getRestaurantDetail(this.id)).customerReviews;
    }
  }

  render() {
    return html`
      <section class="restaurant-review">
        <div class="restaurant-review-list">
          ${this.reviews.map((review) => html`
            <restaurant-review-item
              name="${review.name}"
              date="${review.date}"
              review="${review.review}"
            ></restaurant-review-item>
          `)}
        </div>
        <div class="restaurant-post-review">
          <h3 class="restaurant-post-review-title">Post a Review</h3>
          <div class="restaurant-post-review-name">
            <label for="reviewerNameInput">Name</label>
            <input 
              @input="${this.currentNameHandler}"
              type="text"
              name="name"
              id="reviewerNameInput">
          </div>
          <div class="restaurant-post-review-text">
            <label for="reviewerTextInput">Write Your Review</label>
            <textarea
              @input="${this.currentReviewHandler}"
              name="content"
              id="reviewerTextInput"
            ></textarea>
          </div>
          <div class="restaurant-post-review-submit">
            <button 
              @click="${this.submitReviewHandler}"
              id="postReviewButton"
              type="button"
              aria-label="submit your review"
            >Submit Review</button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('restaurant-review', RestaurantReview);

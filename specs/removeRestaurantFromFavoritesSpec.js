import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Removing Restaurant from Favorites', () => {
  let el;

  const addModalContainer = () => {
    document.body.innerHTML = `
      <div class="modal hidden">
        <div class="modal-content"></div>
      </div>
    `;
  };

  beforeEach(async () => {
    addModalContainer();
    await FavoriteRestaurantIdb.putRestaurant({id: 1});
    el = await TestFactories.createRestaurantDetailInfo({id: 1});
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('Should render Remove from Favorites Button', async () => {
    expect(el.shadowRoot.querySelector('[aria-label="remove this restaurant from your favorite"]')).toBeTruthy();
  });

  it('Should not render Add to Favorites Button', async () => {
    expect(el.shadowRoot.querySelector('[aria-label="add this restaurant to your favorite"]')).toBeFalsy();
  });

  describe('When Remove from Favorites Button is clicked', () => {
    it('Should remove the restaurant from the database', async () => {
      el.shadowRoot.querySelector('button').dispatchEvent(new Event('click'));
      const movies = await FavoriteRestaurantIdb.getAllRestaurants();

      expect(movies).toEqual([]);
    });

    it('Should not throwing an error if the restaurant is no longer in the database', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(1);
      el.shadowRoot.querySelector('button').dispatchEvent(new Event('click'));
      const movies = await FavoriteRestaurantIdb.getAllRestaurants();

      expect(movies).toEqual([]);
    });
  });
});

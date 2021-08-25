import * as TestFactories from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Adding Restaurant to Favorites', () => {
  const addModalContainer = () => {
    document.body.innerHTML = `
      <div class="modal hidden">
        <div class="modal-content"></div>
      </div>
    `;
  };

  beforeEach(() => {
    addModalContainer();
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('Should render Add to Favorites Button when the restaurant is not on Favorites yet', async () => {
    const el = await TestFactories.createRestaurantDetailInfo({id: 1});

    expect(el.shadowRoot.querySelector('[aria-label="add this restaurant to your favorite"]')).toBeTruthy();
  });

  it('Should not render Remove from Favorites Button when the restaurant is not on Favorites yet', async () => {
    const el = await TestFactories.createRestaurantDetailInfo({id: 1});

    expect(el.shadowRoot.querySelector('[aria-label="remove this restaurant from your favorite"]')).toBeFalsy();
  });

  describe('When Add to Favorites Button is clicked', () => {
    it('Should add the restaurant to the database', async () => {
      const el = await TestFactories.createRestaurantDetailInfo({id: 1});

      el.shadowRoot.querySelector('button').dispatchEvent(new Event('click'));
      const movie = await FavoriteRestaurantIdb.getRestaurant(1);

      expect(movie).toEqual({
        id: 1,
      });

      await FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('Should not add the restaurant to the database if the restaurant id is empty', async () => {
      const el = await TestFactories.createRestaurantDetailInfo({});

      el.shadowRoot.querySelector('button').dispatchEvent(new Event('click'));
      const movies = await FavoriteRestaurantIdb.getAllRestaurants();

      expect(movies).toEqual([]);
    });

    it('Should not add the restaurant to the database if the restaurant is already in the database', async () => {
      const el = await TestFactories.createRestaurantDetailInfo({id: 1});
      await FavoriteRestaurantIdb.putRestaurant({id: 1});

      el.shadowRoot.querySelector('button').dispatchEvent(new Event('click'));
      const movies = await FavoriteRestaurantIdb.getAllRestaurants();

      expect(movies).toEqual([
        {
          id: 1,
        },
      ]);

      await FavoriteRestaurantIdb.deleteRestaurant(1);
    });
  });
});

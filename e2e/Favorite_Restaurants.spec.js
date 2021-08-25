const assert = require('assert');

Feature('Favorite Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty list of restaurant on Favorites Page', ({I}) => {
  I.see('You have not liked any restaurants yet.', '.content p');
});

Scenario('Adding some restaurants to Favorites', async ({I}) => {
  I.see('You have not liked any restaurants yet.', '.content p');

  for (let x = 1; x <= 3; x++) {
    I.amOnPage('/');

    I.seeElement({shadow: [`.restaurant-item:nth-child(${x})`, 'restaurant-name', 'a']});

    const restaurant = locate({shadow: [`.restaurant-item:nth-child(${x})`, 'restaurant-name', 'a']});
    const restaurantTitle = await I.grabTextFrom(restaurant);

    I.click(restaurant);

    I.seeElement({shadow: ['restaurant-detail', 'restaurant-detail-info', '#addToFavoritesButton']});
    I.click({shadow: ['restaurant-detail', 'restaurant-detail-info', '#addToFavoritesButton']});

    I.see('Restaurant added successfully to your Favorite', '.modal-content p');
    I.click('.modal');

    I.amOnPage('/#/favorite');
    I.seeElement({shadow: [`.restaurant-item:nth-child(${x})`, 'restaurant-name', 'a']});

    const favoriteRestaurant = locate({shadow: [`.restaurant-item:nth-child(${x})`, 'restaurant-name', 'a']});
    const favoriteRestaurantTitle = await I.grabTextFrom(favoriteRestaurant);

    assert.strictEqual(restaurantTitle, favoriteRestaurantTitle);
  }
});

Scenario('Removing some restaurants from Favorites', async ({I}) => {
  I.seeElement('#restaurants');

  const totalFavoriteRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');

  for (let x = 1; x <= totalFavoriteRestaurants; x++) {
    I.seeElement({shadow: ['.restaurant-item:first-child', 'restaurant-name', 'a']});

    const restaurant = locate({shadow: ['.restaurant-item:first-child', 'restaurant-name', 'a']});
    const restaurantTitle = await I.grabTextFrom(restaurant);

    I.click(restaurant);

    I.seeElement({shadow: ['restaurant-detail', 'restaurant-detail-info', '#removeFromFavoritesButton']});
    I.click({shadow: ['restaurant-detail', 'restaurant-detail-info', '#removeFromFavoritesButton']});

    I.see('Restaurant removed successfully from your Favorite', '.modal-content p');
    I.click('.modal');

    I.amOnPage('/#/favorite');

    if (x === totalFavoriteRestaurants) break;
    const restaurantTitleRemains = await I.grabTextFromAll(locate({shadow: [`.restaurant-item`, 'restaurant-name', 'a']}));

    if (restaurantTitleRemains.includes(restaurantTitle)) {
      throw new Error('Removed restaurant still rendering on Favorites Page');
    }
  }

  I.see('You have not liked any restaurants yet.', '.content p');
});

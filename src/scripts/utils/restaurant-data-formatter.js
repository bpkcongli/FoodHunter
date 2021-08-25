const RestaurantDataFormatter = {
  format(restaurant) {
    const {categories, menus, ...restaurantNotFormatted} = restaurant;
    const formattedCategories = this._getFormattedCategories(categories);
    const {dishes, beverages} = this._getFormattedMenus(menus);

    return {
      ...restaurantNotFormatted,
      categories: formattedCategories,
      dishes,
      beverages,
    };
  },

  _getFormattedCategories(categories) {
    return categories.map((category) => category.name);
  },

  _getFormattedMenus(menus) {
    const {foods: dishes, drinks: beverages} = menus;
    return {
      dishes: dishes.map((dish) => dish.name).slice(0, 5).join(', '),
      beverages: beverages.map((beverage) => beverage.name).slice(0, 5).join(', '),
    };
  },
};

export default RestaurantDataFormatter;

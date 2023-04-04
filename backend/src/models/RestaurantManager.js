const AbstractManager = require("./AbstractManager");

class RestaurantManager extends AbstractManager {
  constructor() {
    super({ table: "restaurant" });
  }

  insert(restaurant) {
    return this.database.query(
      `insert into ${this.table} (nameRestaurant, adress, link, picture, nameCity) values(?, ?, ?, ?, ?)`,
      [
        restaurant.nameRestaurant,
        restaurant.adress,
        restaurant.link,
        restaurant.picture,
        restaurant.nameCity,
      ]
    );
  }

  update(restaurant) {
    return this.database.query(
      `update ${this.table} set nameRestaurant =?, adress=?, link=?, picture=?, nameCity=? where id = ?`,
      [
        restaurant.nameRestaurant,
        restaurant.adress,
        restaurant.link,
        restaurant.picture,
        restaurant.nameCity,
        restaurant.id,
      ]
    );
  }
}

module.exports = RestaurantManager;

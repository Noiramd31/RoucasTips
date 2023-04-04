const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  insert(city) {
    return this.database.query(
      `insert into ${this.table} (nameCity, picture, link, description) values (?, ?, ?, ?)`,
      [city.nameCity, city.picture, city.link, city.description]
    );
  }

  update(city) {
    return this.database.query(
      `update ${this.table} set nameCity = ?, picture = ?, link = ?, description = ? where id = ?`,
      [city.nameCity, city.picture, city.link, city.description, city.id]
    );
  }
}

module.exports = CityManager;

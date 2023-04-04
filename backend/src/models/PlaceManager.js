const AbstractManager = require("./AbstractManager");

class PlaceManager extends AbstractManager {
  constructor() {
    super({ table: "place" });
  }

  insert(place) {
    return this.database.query(
      `insert into ${this.table} (namePlace, description, picture, link, nameCity ) values (?, ?, ?, ?, ?)`,
      [
        place.namePlace,
        place.description,
        place.picture,
        place.link,
        place.nameCity,
      ]
    );
  }

  update(place) {
    return this.database.query(
      `update ${this.table} set namePlace = ?, description = ?, picture = ?, link = ?, nameCity = ? where id = ?`,
      [place.namePlace, place.picture, place.link, place.nameCity, place.id]
    );
  }
}

module.exports = PlaceManager;

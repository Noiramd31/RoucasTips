const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmail(email) {
    return this.database.query(`select * from ${this.table} where email = ?`, [
      email,
    ]);
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, nickname, avatar, email, password, role_adm)  values (?, ?, ?, ?, ?, ?, 0)`,
      [
        user.firstname,
        user.lastname,
        user.nickname,
        user.avatar,
        user.email,
        user.password,
        user.role_adm,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, nickname = ?,avatar=?, email = ?, password = ?, role_admin = ?,  where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.nickname,
        user.avatar,
        user.email,
        user.password,
        user.role_admin,
        user.id,
      ]
    );
  }
}

module.exports = UserManager;

import knex from "knex";
import path from "path";

export class Connection {

  getConnection() {
    return knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, '..', '..', 'database.sqlite')
      },
      useNullAsDefault: true
    });
  }

}
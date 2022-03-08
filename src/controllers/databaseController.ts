import {
  Database,
  SQLite3Connector,
} from "https://deno.land/x/denodb@v1.0.40/mod.ts";
import * as path from "https://esm.sh/path";
import Users from "../models/users.ts";

const initDB = () => {
  const database = new Database(
    new SQLite3Connector({
      filepath: path.join("database.db"),
    }),
  );

  database.link([Users]);
  database.sync();

  return database;
};

export default initDB;

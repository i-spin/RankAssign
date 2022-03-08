import { DataTypes, Model } from "https://deno.land/x/denodb@v1.0.40/mod.ts";

class Users extends Model {
  static table = "users";

  static fields = {
    discord_id: {
      type: DataTypes.BIG_INTEGER,
      primaryKey: true,
    },
    tetrio_id: DataTypes.TEXT,
  };
}

export default Users;

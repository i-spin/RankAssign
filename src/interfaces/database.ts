interface Discord {
  handle: string,
}

interface Tetrio {
  handle: string,
  rank: string,
}

interface User {
  discord: Discord,
  tetrio: Tetrio,
}

interface Guild {
  id: string,
  users: User[],
}
interface Database {
  guild: Guild[],
}

export {
  Discord,
  Tetrio,
  User,
  Database,
};

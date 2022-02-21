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
  roles: Map<string, string>,
}
interface Database {
  guild: Guild[],
}

export {
  Discord,
  Tetrio,
  User,
  Guild,
  Database,
};

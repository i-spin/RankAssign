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

interface Database {
  users: User[]
}

export {
  Discord,
  Tetrio,
  User,
  Database,
};

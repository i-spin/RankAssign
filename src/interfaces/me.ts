/* eslint-disable no-use-before-define */
export interface Me {
  success: boolean
  user: User
}

export interface User {
  _id: string
  username: string
  email: string
  role: string
  ts: string
  badges: Badge[]
  xp: number
  banlist: any[]
  warnings: any[]
  bannedstatus: string
  privacy_showwon: boolean
  privacy_showplayed: boolean
  privacy_showgametime: boolean
  privacy_showcountry: boolean
  privacy_privatemode: string
  privacy_status_shallow: string
  privacy_status_deep: string
  privacy_status_exact: string
  privacy_dm: string
  privacy_invite: string
  country: string
  supporter: boolean
  supporter_expires: number
  total_supported: number
  thanked: boolean
  league: League
  zen: Zen
  records: Records
  avatar_revision: number
  banner_revision: number
  bio: string
  connections: Connections
  totp: Totp
}

export interface Badge {
  id: string
  label: string
  ts: string
}

export interface League {
  gamesplayed: number
  gameswon: number
  rating: number
  glicko: number
  rd: number
  rank: string
  apm: number
  pps: number
  vs: number
  decaying: boolean
  standing: number
  standing_local: number
}

export interface Zen {
  map: string
  level: number
  progress: number
  score: number
}

export interface Records {
  "40l": N40l
  blitz: Blitz
}

export interface N40l {
  _id: string
  stream: string
  replayid: string
  user: User2
  ts: string
  endcontext: Endcontext
  ismulti: boolean
}

export interface User2 {
  _id: string
  username: string
}

export interface Endcontext {
  seed: number
  lines: number
  level_lines: number
  level_lines_needed: number
  inputs: number
  holds: number
  time: Time
  score: number
  zenlevel: number
  zenprogress: number
  level: number
  combo: number
  currentcombopower: number
  topcombo: number
  btb: number
  topbtb: number
  tspins: number
  piecesplaced: number
  clears: Clears
  garbage: Garbage
  kills: number
  finesse: Finesse
  finalTime: number
  gametype: string
}

export interface Time {
  start: number
  zero: boolean
  locked: boolean
  prev: number
  frameoffset: number
}

export interface Clears {
  singles: number
  doubles: number
  triples: number
  quads: number
  realtspins: number
  minitspins: number
  minitspinsingles: number
  tspinsingles: number
  minitspindoubles: number
  tspindoubles: number
  tspintriples: number
  tspinquads: number
  allclear: number
}

export interface Garbage {
  sent: number
  received: number
  attack: number
  cleared: number
}

export interface Finesse {
  combo: number
  faults: number
  perfectpieces: number
}

export interface Blitz {
  _id: string
  stream: string
  replayid: string
  user: User3
  ts: string
  endcontext: Endcontext2
  ismulti: boolean
}

export interface User3 {
  _id: string
  username: string
}

export interface Endcontext2 {
  seed: number
  lines: number
  level_lines: number
  level_lines_needed: number
  inputs: number
  holds: number
  time: Time2
  score: number
  zenlevel: number
  zenprogress: number
  level: number
  combo: number
  currentcombopower: number
  topcombo: number
  btb: number
  topbtb: number
  tspins: number
  piecesplaced: number
  clears: Clears2
  garbage: Garbage2
  kills: number
  finesse: Finesse2
  finalTime: number
  gametype: string
}

export interface Time2 {
  start: number
  zero: boolean
  locked: boolean
  prev: number
  frameoffset: number
}

export interface Clears2 {
  singles: number
  doubles: number
  triples: number
  quads: number
  realtspins: number
  minitspins: number
  minitspinsingles: number
  tspinsingles: number
  minitspindoubles: number
  tspindoubles: number
  tspintriples: number
  tspinquads: number
  allclear: number
}

export interface Garbage2 {
  sent: number
  received: number
  attack: number
  cleared: number
}

export interface Finesse2 {
  combo: number
  faults: number
  perfectpieces: number
}

export interface Connections {
  discord: Discord
}

export interface Discord {
  username: string
  public: boolean
}

export interface Totp {
  codes_remaining: number
}

import fetch from 'node-fetch';

import Authenticate from '../interfaces/authenticate.js';
import Exists from '../interfaces/exists.js';
import { Me } from '../interfaces/me.js';

const exists = (username: string): Promise<Exists | void> => fetch(`https://tetr.io/api/users/${username}/exists`)
  .then((res) => res.json())
  .then((data) => (data as Exists))
  .catch((err) => Promise.reject(err));

const authenticate = (username: string, password: string): Promise<Authenticate | void> => fetch('https://tetr.io/api/users/authenticate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  }),
})
  .then((res) => res.json())
  .then((data) => (data as Authenticate))
  .catch((err) => Promise.reject(err));

const me = (token: string): Promise<Me> => fetch('https://tetr.io/api/users/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => (data as Me))
  .catch((err) => Promise.reject(err));

export {
  exists,
  authenticate,
  me,
};

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'graceful-fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Login from '../interfaces/login.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/', express.static(path.join(dirname, 'auth')));

app.get('/', (req, res) => {
  res.sendFile(path.join(dirname, 'auth', 'index.html'));
});

app.post('/login', urlencodedParser, (req, res) => {
  const data: Login = req.body;
  if (!fs.existsSync(path.join(dirname, 'temp', `${data.token}.json`))) {
    res.sendStatus(403);
    return;
  }
  fs.writeFileSync(path.join(dirname, 'temp', `${data.token}.json`), JSON.stringify(data));
  res.sendStatus(200);
});

export default app;

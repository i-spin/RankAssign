import express from 'express';
import bodyParser from 'body-parser';
import fs from 'graceful-fs';
import path from 'path';
import toml from 'toml';
import Config from '../interfaces/config';
import Login from '../interfaces/login';

const config: Config = toml.parse(fs.readFileSync(path.join('config.toml'), 'utf8'));
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/', express.static(path.join(path.resolve(), 'src', 'server', 'auth')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'src', 'server', 'auth', 'index.html'));
});

app.post('/login', urlencodedParser, (req, res) => {
  const data: Login = req.body;
  fs.writeFileSync(path.join(path.resolve(), 'src', 'server', 'auth', 'login.json'), JSON.stringify(data));
  res.sendStatus(200);
});

app.listen(config.server.port);

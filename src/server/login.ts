import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/', express.static(path.join(__dirname, 'auth')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'auth', 'index.html'));
});

app.post('/api/login', urlencodedParser, (req, res) => {
  res.sendStatus(200);
});

app.listen(8000);

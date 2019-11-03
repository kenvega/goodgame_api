import express from 'express';
import request from 'request';
import 'request-promise-native';
import { clientId } from './config/index.js';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('hello there');
});

app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q)
    return res.status(400).json({
      error: 'required name parameter',
    });

  const response = await request(
    `https://www.boardgameatlas.com/api/search?name=${q}&client_id=${clientId}&limit=10`,
  );

  res.json(JSON.parse(response));
});

app.listen(PORT, () => {
  console.log('info message: listening from port: ', PORT);
});

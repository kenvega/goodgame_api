import express from 'express';
import request from 'request';
import 'request-promise-native';
import { clientId } from './config/index.js';
import { authenticateDb } from './db/index.js';

async function main() {
  await authenticateDb();
  console.log('connection to db successful');
}

main().catch(console.error);

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('hello there');
});

app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({
      error: 'required name parameter',
    });
    return;
  }

  const response = await request(
    `https://www.boardgameatlas.com/api/search?name=${q}&client_id=${clientId}&limit=10`,
  );

  res.json(JSON.parse(response));
});

app.listen(PORT, () => {
  console.log('info message: listening from port: ', PORT);
});

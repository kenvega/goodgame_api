import express from 'express';
import { authenticateDb } from './utils/db.js';
import suggestionRouter from './resources/suggestion/suggestion.router.js';

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

app.use('/api/suggestion', suggestionRouter);

app.listen(PORT, () => {
  console.log('info message: listening from port: ', PORT);
});

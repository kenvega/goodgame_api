const express = require('express');

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('hello there');
});

app.get('/test', (req, res) => {
  res.send('test');
});

app.listen(PORT, () => {
  console.log('info message: listening from port: ', PORT);
});

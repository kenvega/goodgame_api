const express = require('express');

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('hello there');
});

app.listen(PORT, () => {
  console.log('info message: listening from port: ', PORT);
});

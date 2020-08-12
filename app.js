const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.status(200).send('Hello Express!');
});

app.get('/quotient', (req, res) => {
  const { a , b } = req.query;

  if(!a) {
    return res
      .status(400)
      .send('Value for a is needed');
  }

  if(!b) {
    return res
      .status(400)
      .send('Value for b is needed');
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);
  
  if(isNaN(numA)) {
    return res
      .status(400)
      .send('Value for a must be numeric');
  }

  if(isNaN(numB)) {
    return res
      .status(400)
      .send('Value for a must be numeric');
  }

  if(numB == 0) {
    return res
      .status(400)
      .send('Cannot divide by 0');
  }

  const ans = numA / numB;

  res
    .send(`${a} divided by ${b} is ${ans}`);

});

app.get('/generate', (req, res) => {
  const { n } = req.query;

  const num = parseInt(n);

  if(isNaN(num)) {
    return res
      .status(400)
      .send('Invalid request');
  }

  const initial = Array(num)
    .fill(1)
    .map((_, i) => i + 1);

  initial.forEach((e, i) => {
    let ran = Math.floor(Math.random() * num);
    let temp = initial[i];
    initial[i] = initial[ran];
    initial[ran] = temp;
  });

  res.json(initial);

});


module.exports = app;
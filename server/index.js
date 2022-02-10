const express = require('express');
const app = express();
const port = 3000;
const { db } = require('../database/index.js');

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Jeopardy listening on port ${port}`)
})

app.get('/questions', async (req, res) => {
  let result = await db.getQuestions();
  res.status(200).send(result);
})

app.get('/highScore', async (req, res) => {
  let result = await db.getScores();
  res.status(200).send(result);
})

app.post('/highScore', async (req, res) => {
  console.log(req.body)
  let result = await db.postScores(req.body.name, req.body.score);
  res.status(200).send(result);
})
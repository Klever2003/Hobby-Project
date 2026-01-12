const express = require('express')
const cors = require('cors')
const scrape = require('./scrape')
const app = express()
const port = 4000

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome To Odds API Homepage');
})

app.get('/nba', async (req, res) => {
  const data = await scrape();
  res.json(data);
})

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
})
const express = require('express')
const cors = require('cors')
const {scrape, draftKingsConfig, BetMgmConfig, FanDuelConfig} = require('./scrape')
const { mergeGames } = require('./merge')
const app = express()
const port = 4000

let cache = {
  data: null,
  timestamp: null
};

const CACHE_TTL = 30 * 60 * 1000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome To Odds API Homepage');
})

app.get('/nba', async (req, res) => {
  const now = Date.now();

  if (cache.data && cache.timestamp && (now - cache.timestamp < CACHE_TTL)) {
    return res.json(cache.data);
  }

  const dkdata = await scrape(draftKingsConfig);
  const betdata = await scrape(BetMgmConfig);
  const fddata = await scrape(FanDuelConfig);

  const mergedData = mergeGames(
  { bookName: 'DraftKings', games: dkdata },
  { bookName: 'BetMGM', games: betdata },
  { bookName: 'FanDuel', games: fddata },
); 

  cache.data = mergedData;
  cache.timestamp = now;
  console.log('MERGED DATA:', JSON.stringify(mergedData, null, 3));

  res.json(mergedData);
})

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
})
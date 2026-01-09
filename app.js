const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome To Odds API Homepage')
})

app.get('/nba', (req, res) => {
  res.send("NBA Homepage")
})

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`)
})
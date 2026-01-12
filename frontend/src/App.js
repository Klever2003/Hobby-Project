import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {

  const [odds, setOdds] = useState();

  useEffect(() => {
    Axios.get("http://localhost:4000/nba")
    .then((res) => {
      setOdds(res.data);
    });
  }, []);

  return (
    <div className="App">
      <button>MoneyLine Odds</button>
      {odds && odds.map((game, index) => (
        <div key = {index}>
          <h3>{game.Visitor} @ {game.Home}</h3>
          <p>MoneyLine: {game.MoneyLineVisitor} | {game.MoneyLineHome}</p>
          <p>Spread: {game.SpreadVisitor.Line} | {game.SpreadHome.Line}</p>
          <p>Spread Odds: {game.SpreadVisitor.Odds} | {game.SpreadHome.Odds}</p>
          <p>Total Over: {game.TotalOver.Line} | Total Under: {game.TotalUnder.Line}</p>
          <p>Total Over Odds: {game.TotalOver.Odds} | Total Under Odds: {game.TotalUnder.Odds}</p>
          </div>
      ))}
      </div>
  );
}

export default App;

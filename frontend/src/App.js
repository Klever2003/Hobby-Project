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
  
  if (!odds) return <div>Loading...</div>; 

  return (
    <div className="App">

      <table className="border-separate border border-gray-400 w-full h-screen">
        <thead>
          <tr>
            <th className = "border border-gray-400" scope ="col" rowSpan ="2">Matchup</th>
            <th className = "border border-gray-400" scope ="colgroup" colSpan ="3">Moneyline</th>
            <th className = "border border-gray-400" scope ="colgroup" colSpan = "3">Spread</th>
            <th className = "border border-gray-400" scope ="colgroup" colSpan = "3">Total</th>
          </tr>
          <tr>
            <th className="border border-gray-400" scope ="col">DraftKings</th>
            <th className="border border-gray-400" scope ="col">BetMGM</th>
            <th className="border border-gray-400" scope ="col">FanDuel</th>
            <th className="border border-gray-400" scope ="col">DraftKings</th>
            <th className="border border-gray-400" scope ="col">BetMGM</th>
            <th className="border border-gray-400" scope ="col">FanDuel</th>
            <th className="border border-gray-400" scope ="col">DraftKings</th>
            <th className="border border-gray-400" scope ="col">BetMGM</th>
            <th className="border border-gray-400" scope ="col">FanDuel</th>
          </tr>
        </thead>
        <tbody>
          {odds.map((game, index) => (
            <tr key={index}>
              <td className = "border border-gray-400" >{game.matchup.visitor} @ <br></br> {game.matchup.home}</td>
              <td className = "border border-gray-400">{game.odds.DraftKings.moneyline.Visitor} <br></br> {game.odds.DraftKings.moneyline.Home}</td>
              <td className = "border border-gray-400">{game.odds.BetMGM.moneyline.Visitor} <br></br> {game.odds.BetMGM.moneyline.Home}</td>
              <td className = "border border-gray-400">{game.odds.FanDuel.moneyline.Visitor} <br></br> {game.odds.FanDuel.moneyline.Home}</td>
              <td className = "border border-gray-400">{game.odds.DraftKings.spread.visitor.Line} ({game.odds.DraftKings.spread.visitor.Odds}) <br></br> {game.odds.DraftKings.spread.home.Line} ({game.odds.DraftKings.spread.home.Odds})</td>
              <td className = "border border-gray-400">{game.odds.BetMGM.spread.visitor.Line} {game.odds.BetMGM.spread.visitor.Odds} <br></br> {game.odds.BetMGM.spread.home.Line} {game.odds.BetMGM.spread.home.Odds}</td>
              <td className = "border border-gray-400">{game.odds.FanDuel.spread.visitor.Line} ({game.odds.FanDuel.spread.visitor.Odds}) <br></br> {game.odds.FanDuel.spread.home.Line} ({game.odds.FanDuel.spread.home.Odds})</td>

              <td className = "border border-gray-400">{game.odds.DraftKings.total.Totals} <br></br> ({game.odds.DraftKings.total.Odds})</td>
              <td className = "border border-gray-400">{game.odds.BetMGM.total.Totals} <br></br> {game.odds.BetMGM.total.Odds}</td>
              <td className = "border border-gray-400">{game.odds.FanDuel.total.Totals} <br></br> {game.odds.FanDuel.total.Odds}</td>
            </tr> 
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default App;

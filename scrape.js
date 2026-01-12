const puppeteer = require('puppeteer');

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://sportsbook.draftkings.com/leagues/basketball/nba';

  await page.goto(url);

  //This is where I scraped the spread, total and MoneyLine values alongside their respective odds.

  const odds = await page.evaluate(() => {
    const oddsElements = document.querySelectorAll('span.cb-market__button-odds');
    return Array.from(oddsElements).map((odds) => {
      return odds.textContent;
    });
  });

  const spread = await page.evaluate(() => {
    const spreadElememnts = document.querySelectorAll('span.cb-market__button-points');
    return Array.from(spreadElememnts).map((spread) => {
      return spread.textContent;
    });
  });


  const teamName = await page.evaluate(() => {
    const teamNames = document.querySelectorAll('span.cb-market__label-inner.cb-market__label-inner--parlay');
    return Array.from(teamNames).map((teamName) => {
      return teamName.textContent;
    });
  });

//This was designed to organize every betting odd alongside their respective prop and matchup.
  const organization = () => {
    const games = [];

    for (i = 0; i < teamName.length; i +=2) {

      const gameNum = i / 2;
      const oddsStart = gameNum * 6;
      const spreadStart = gameNum * 4;

      const game = {
      Visitor: teamName[i],
      Home: teamName[i + 1],
      SpreadVisitor: {
        Line: spread[spreadStart],
        Odds: odds[oddsStart],
      },
      SpreadHome: {
        Line: spread[spreadStart + 2],
        Odds: odds[oddsStart + 3],
      },
      TotalOver: {
        Line: spread[spreadStart + 1],
        Odds: odds[oddsStart + 1],
      },
      TotalUnder: {
        Line: spread[spreadStart + 3],
        Odds: odds[oddsStart + 4],
      },
      MoneyLineVisitor: odds[oddsStart + 2],
      MoneyLineHome: odds[oddsStart + 5],
      };
      games.push(game);
      console.log(game.Visitor + " @ " + game.Home);
      console.log(game);
    };
    return games;
  };

  await browser.close();

  const result = organization();
  return result;
};

module.exports = scrape;
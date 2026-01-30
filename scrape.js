const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());


// Function Organizer for each respective SportsBook according to their specific odds layout
const draftKingsOrganizer = (teamNames, oddP, spreadT) => {
  return {
      Visitor: teamNames[0],
      Home: teamNames[1],

      SpreadVisitor: {
        Line: spreadT[0],
        Odds: oddP[0],
      },

      SpreadHome: {
        Line: spreadT[2],
        Odds: oddP[3],
      },

      Totals: {
        Totals: spreadT[1] + ' ' + spreadT[3],
        Odds: oddP[1] + ' ' + oddP[4],
      },

      MoneyLines: {
        Visitor: oddP[2],
        Home: oddP[5],
      },
  }
}

const betMgmOrganizer = (teamNames, oddP, spreadT) => {
  return {
      Visitor: teamNames[0],
      Home: teamNames[1],

      SpreadVisitor: {
        Line: spreadT[0],
        Odds: oddP[0],
      },

      SpreadHome: {
        Line: spreadT[1],
        Odds: oddP[1],
      },

      Totals: {
        Totals: spreadT[2] + ' ' + spreadT[3],
        Odds: oddP[3] + ' ' + oddP[4],
      },

      MoneyLines: {
        Visitor: oddP[5],
        Home: oddP[6],
      },
  }
}

const fanduelOrganizer = (teamNames, oddP, spreadT) => {
  return {
      Visitor: teamNames[0],
      Home: teamNames[1],

      SpreadVisitor: {
        Line: spreadT[0],
        Odds: oddP[0],
      },

      SpreadHome: {
        Line: spreadT[2],
        Odds: oddP[3],
      },

      Totals: {
        Totals: spreadT[1] + ' ' + spreadT[3],
        Odds: oddP[2] + ' ' + oddP[5],
      },

      MoneyLines: {
        Visitor: oddP[1],
        Home: oddP[4],
      },
  }
}

const draftKingsConfig = {
  name: "DraftKings",
  url: "https://sportsbook.draftkings.com/leagues/basketball/nba",
  selectors: {
    odds: 'span.cb-market__button-odds',
    spread: 'span.cb-market__button-points',
    teamName: 'span.cb-market__label-inner.cb-market__label-inner--parlay',
    gameEvent: 'div.cb-market__template.cb-market__template--2-columns'
  },
  organizer: draftKingsOrganizer
};

  const BetMgmConfig = {
  name: "BetMGM",
  url: 'https://www.nj.betmgm.com/en/sports/basketball-7/betting/usa-9/nba-6004',
  selectors: {
    odds: 'span.custom-odds-value-style.ng-star-inserted',
    spread: 'div.option-attribute.ng-star-inserted',
    teamName: 'div.participant',
    gameEvent: 'div.grid-event-wrapper.has-all-markets.image.ng-star-inserted'
  },
  organizer: betMgmOrganizer
};

  const FanDuelConfig = {
    name: "FanDuel",
    url: 'https://sportsbook.fanduel.com/navigation/nba',
    selectors: {
      odds: 'span.hg.hh.dx.dr.ho.hp.ei',
      spread: 'span.hg.hh.av.ho.dr.ei', 
      teamName: 'span.ae.af.gz.ha.hb.hc.gh.gi.gj.gn.hd.s.dx.by.he.h.i.j.ah.ai.m.aj.o.ak.q.al.ax',
      gameEvent: 'div.am.an.ao.ap.af.gu.s.ey.gv.ez.h.i.j.ah.ai.m.aj.o.ak.q.al'
    },
    organizer: fanduelOrganizer
  };

const scrape = async (config) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

await page.goto(config.url);
await new Promise(resolve => setTimeout(resolve, 6000)); 

  //This is where I scraped the spread, total and MoneyLine values alongside their respective odds.

const games = await page.evaluate((gameEventSelector, teamSelector, oddSelector, spreadSelector) => {
  const gameContainers = document.querySelectorAll(gameEventSelector);
  
  return Array.from(gameContainers).map((container) => {
    
    const teams = container.querySelectorAll(teamSelector);
    const teamNames = Array.from(teams).map(t => t.textContent);

    const odd = container.querySelectorAll(oddSelector);
    const oddP = Array.from(odd).map(o => o.textContent);

    const spreads = container.querySelectorAll(spreadSelector);
    const spreadT = Array.from(spreads).map(s => s.textContent);

    
    
    return {

        DEBUG_teams: teamNames,
        DEBUG_odds: oddP,
        DEBUG_spreads: spreadT,

    };
  });
}, config.selectors.gameEvent, config.selectors.teamName, config.selectors.odds, config.selectors.spread);

const organizedGames = games.map(game => 
  config.organizer(game.DEBUG_teams, game.DEBUG_odds, game.DEBUG_spreads)
);

console.log(organizedGames); 

await browser.close();
return organizedGames;

};

module.exports = {
  scrape,
  BetMgmConfig,
  draftKingsConfig,
  FanDuelConfig
};
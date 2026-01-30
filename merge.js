// Normalizing team names so that each sportsbook can interpret matchups the same way
const normalizeTeam = (name) => {
  return name.trim().toLowerCase().split(" ").pop();
};

const createKey = (visitor, home) => {
  return normalizeTeam(visitor) + '-' + normalizeTeam(home);
};

// This is the function that will be utilized to merge data within multiple sportsbooks for the purpose of side-by-side comparison
const mergeGames = (...allSportsbookData) => {
  const gamesMap = {};

  allSportsbookData.forEach(({ bookName, games }) => {
    games.forEach(game => {
      const key = createKey(game.Visitor, game.Home)
      if (!gamesMap[key]) {
        gamesMap[key] = {
        matchup: {visitor: game.Visitor, home: game.Home },
        odds: {}
      };
    }

      gamesMap[key].odds[bookName] = {
        spread: {visitor: game.SpreadVisitor, home: game.SpreadHome},
        total: game.Totals,
        moneyline: game.MoneyLines
      };
    });
  });

  return Object.values(gamesMap);
};

module.exports = { mergeGames };
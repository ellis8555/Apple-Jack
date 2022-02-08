let fetchHaxBallData = await fetch("../json/haxData.json");
let haxBallData = await fetchHaxBallData.json();

////////////////////// destructed variables
// 1. TEAMS - has map
// 2. PLAYERS - has map
// 3. GAME TYPE - has map
// 4. TEAM PLAYERS
// 5. GAME RESULTS
// 6. GAME PLAYER STATS
export let {
  Teams: teams,
  Players: players,
  GameType: gameType,
  TeamPlayers: teamPlayers,
  GameResults: gameResults,
  GamePlayerStats: gamePlayerStats,
} = haxBallData;
// TEAMS //
let defendingChamps = "Haxual Chocolate";
// let { Teams: teams } = haxBallData; // List of all teams
let teamsLength = teams.length;
let teamsMAP = new Map();
for (let i = 0; i < teamsLength; i++) {
  // map a list of teams
  teamsMAP.set(Number(teams[i].TeamID), teams[i].TeamName);
}
let teamsColorMAP = new Map();
for (let i = 0; i < teamsMAP.size; i++) {
  teamsColorMAP.set(teamsMAP.get(i + 1), teams[i].MainColor);
}
// PLAYERS //
// let { Players: players } = haxBallData; // list of all players
let playersLength = players.length;
let playersMAP = new Map();
for (let i = 0; i < playersLength; i++) {
  // map a list of players
  playersMAP.set(Number(players[i].PlayerID), players[i].Players);
}
// GAME TYPE //
// let { GameType: gameType } = haxBallData; // game type either season or playoff
let gameTypeLength = gameType.length;
let gameTypeMAP = new Map();
for (let i = 0; i < gameTypeLength; i++) {
  // map a list of players
  gameTypeMAP.set(Number(gameType[i].GameTypeID), gameType[i].GameType);
}
// TEAM PLAYERS //
// let { TeamPlayers: teamPlayers } = haxBallData; // list of who plays on what team
let teamPlayersLength = teamPlayers.length;

// GAME RESULTS //
// let { GameResults: gameResults } = haxBallData; // list of game scores
let gameResultsLength = gameResults.length;
let seasonCount = Array.from(
  //get count of how many seasons in order to create arrays for each season
  new Set(gameResults.map((item) => item.SeasonNumber))
);
let seasonCountLength = seasonCount.length;
seasonCount.sort((a, b) => a - b);

// GAME PLAYER STATS //
// let { GamePlayerStats: gamePlayerStats } = haxBallData; // list of individual game player stats
let gamePlayerStatsLength = gamePlayerStats.length;

// maps
export { teamsMAP, teamsColorMAP, playersMAP, gameTypeMAP };
// var lengths
export {
  teamsLength,
  playersLength,
  gameTypeLength,
  teamPlayersLength,
  gameResultsLength,
  seasonCountLength,
  gamePlayerStatsLength,
};
// arrays
export { defendingChamps, seasonCount };

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
//**** MISC ****//
let currentSeason = Math.max(
  Array.from(new Set(teamPlayers.map((item) => +item.SeasonNumber)))
);
//**** TEAMS ****//
let defendingChamps = "Haxual Chocolate";
let teamsLength = teams.length;
let teamNames = [teamsLength];
let eachTeamObjectMAP = new Map(); // maps out each teams basic info. ID, Color, logo file path, etc...
let teamsMAP = new Map();
let teamsNumMAP = new Map();
let teamsSeasonsMAP = new Map();
for (let i = 0; i < teamsLength; i++) {
  teamNames[i] = teams[i].TeamName;
  eachTeamObjectMAP.set(teamNames[i], teams[i]);
}
for (let i = 0; i < teamsLength; i++) {
  // map a list of teams with ID number to name
  teamsMAP.set(Number(teams[i].TeamID), teams[i].TeamName);
  teamsNumMAP.set(teams[i].TeamName, Number(teams[i].TeamID));
}
for (let i = 1; i <= teamsMAP.size; i++) {
  teamsSeasonsMAP.set(
    teamsMAP.get(i),
    Array.from(
      new Set(
        teamPlayers
          .filter((item) => item.TeamID == teamsNumMAP.get(teamsMAP.get(i)))
          .map((item) => item.SeasonNumber)
      )
    )
  );
}
let teamsColorMAP = new Map(); // maps teams main color with ID number
for (let i = 0; i < teamsMAP.size; i++) {
  teamsColorMAP.set(teamsMAP.get(i + 1), teams[i].MainColor);
}
//**** PLAYERS ****//
let playersLength = players.length;
let playersMAP = new Map();
for (let i = 0; i < playersLength; i++) {
  // map a list of players
  playersMAP.set(Number(players[i].PlayerID), players[i].Players);
}
//**** GAME TYPE ****//
let gameTypeLength = gameType.length;
let gameTypeMAP = new Map();
for (let i = 0; i < gameTypeLength; i++) {
  // map a list of players
  gameTypeMAP.set(Number(gameType[i].GameTypeID), gameType[i].GameType);
}
//**** TEAM PLAYERS ****//
let teamPlayersLength = teamPlayers.length;

//**** GAME RESULTS ****//
let gameResultsLength = gameResults.length;
let seasonCount = Array.from(
  //get count of how many seasons in order to create arrays for each season
  new Set(gameResults.map((item) => item.SeasonNumber))
);
let seasonCountLength = seasonCount.length;
seasonCount.sort((a, b) => a - b);
//**** GAME PLAYER STATS ****//
let gamePlayerStatsLength = gamePlayerStats.length;

// maps
export {
  teamsMAP,
  eachTeamObjectMAP,
  teamsNumMAP,
  teamsSeasonsMAP,
  teamsColorMAP,
  playersMAP,
  gameTypeMAP,
};
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
export { defendingChamps, seasonCount, currentSeason };

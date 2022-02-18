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
  ...Array.from(new Set(teamPlayers.map((item) => +item.SeasonNumber)))
);
let seasonCount = Array.from(
  //get count of how many seasons in order to create arrays for each season
  new Set(teamPlayers.map((item) => item.SeasonNumber))
);
let seasonCountLength = seasonCount.length;
seasonCount.sort((a, b) => a - b);
let defendingChamps = "Haxual Chocolate";
let seasonsWithTieGames = [1];
//**** TEAMS ****//
let teamsLength = teams.length; // counts all teams ever competed
let teamNames = [teamsLength]; // array of all team names ever compted
let eachTeamObjectMAP = new Map(); // maps out each teams basic info. ID, Color, logo file path, etc...
let teamsMAP = new Map(); // maps teams via key is teamID number to textual name as value
let teamsNumMAP = new Map(); // maps teams via key as textual name to teamID number
let teamsSeasonsMAP = new Map(); // maps via key as textual name to array of which seasons team competed in
let eachSeasonsTeamsMAP = new Map(); // maps via key as number representing season to array value of which teams competed that season
for (let i = 0; i < teamsLength; i++) {
  teamNames[i] = teams[i].TeamName;
  eachTeamObjectMAP.set(teamNames[i], teams[i]);
}
for (let i = 0; i < teamsLength; i++) {
  // map a list of teams with ID number to name
  teamsMAP.set(Number(teams[i].TeamID), teams[i].TeamName);
  teamsNumMAP.set(teams[i].TeamName, Number(teams[i].TeamID));
}
// lists which seasons each team participated in
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
// list of teams playing in any given season
for (let i = 1; i <= seasonCountLength; i++) {
  eachSeasonsTeamsMAP.set(
    i,
    Array.from(
      new Set(
        teamPlayers
          .filter((item) => item.SeasonNumber == i)
          .map((item) => teamsMAP.get(+item.TeamID))
      )
    )
  );
}
// maps teams main color with ID number
let teamsColorMAP = new Map();
for (let i = 0; i < teamsMAP.size; i++) {
  teamsColorMAP.set(teamsMAP.get(i + 1), teams[i].MainColor);
}
//**** PLAYERS ****//
let playersLength = players.length;
let playersMAP = new Map(); // maps key as playerID to textual value of players name
let playersNumMAP = new Map(); // maps key as textual name key to playerID value
let playerSeasonsMAP = new Map();
for (let i = 0; i < playersLength; i++) {
  // map a list of players number key to textual value
  playersMAP.set(Number(players[i].PlayerID), players[i].Players);
}
for (let i = 0; i < playersLength; i++) {
  // map a list of players textual key to number value nameID
  playersNumMAP.set(players[i].Players, Number(players[i].PlayerID));
}
for (let i = 0; i < playersLength; i++) {
  // map a list what seasons each player played in
  playerSeasonsMAP.set(
    playersMAP.get(i + 1),
    Array.from(
      teamPlayers
        .filter((item) => item.PlayerID == i + 1)
        .map((item) => item.SeasonNumber)
    )
  );
}
//**** GAME TYPE ****//
let gameTypeLength = gameType.length;
let gameTypeMAP = new Map();
let gameTypeNumMAP = new Map();
for (let i = 0; i < gameTypeLength; i++) {
  // map a list of season modes by Number to name (Season or Playoff)
  gameTypeMAP.set(Number(gameType[i].GameTypeID), gameType[i].GameType);
}
for (let i = 0; i < gameTypeLength; i++) {
  // map a list of season modes by Name to number (Season or Playoff)
  gameTypeNumMAP.set(gameType[i].GameType, Number(gameType[i].GameTypeID));
}
//**** TEAM PLAYERS ****//
let teamPlayersLength = teamPlayers.length;

//**** GAME RESULTS ****//
let gameResultsLength = gameResults.length;

//**** GAME PLAYER STATS ****//
let gamePlayerStatsLength = gamePlayerStats.length;
// maps
export {
  teamsMAP,
  eachTeamObjectMAP,
  teamsNumMAP,
  eachSeasonsTeamsMAP,
  teamsSeasonsMAP,
  teamsColorMAP,
  playersMAP,
  playersNumMAP,
  playerSeasonsMAP,
  gameTypeMAP,
  gameTypeNumMAP,
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
export { defendingChamps, seasonCount, currentSeason, seasonsWithTieGames };

import { TeamStats } from "../createTeams.js";
import { IndividualPlayerStats } from "../createPlayers.js";
import {
  teams,
  teamsMAP,
  eachTeamObjectMAP,
  teamsNumMAP,
  teamsColorMAP,
  gameTypeMAP,
  gameTypeNumMAP,
  seasonCountLength,
} from "../../../json/masterVars.js";
import sortGroupedStats from "../../functions/sort.js";
import { setTableListeners } from "../../functions/listeners.js";
import {
  closeSidebar,
  clearScoreboardDiv,
  getScoreboardDiv,
  getTablesDiv,
  clearTablesDiv,
  setHeaderBanner,
} from "../../functions/variousFunctions.js";
import { getTeamsPlayersPerSeason } from "../../functions/teamPlayerList.js";

// END OF IMPORTS

// SET FIELDS FOR TEAMS TABLES
let homePageFields = ["Team", "GP", "Wins", "Losses", "Draws", "Points"];
let fullTable = [
  "Team",
  "GP",
  "Wins",
  "Losses",
  "Draws",
  "Points",
  "GF",
  "GFA",
  "GA",
  "GAA",
  "GD",
];

// SET FIELDS FOR PLAYERS TABLES
let playersTable = [
  "Name",
  "GP",
  "Goals",
  "Assists",
  "Points",
  "Kicks",
  "Passes",
  "ShotsOnGoal",
  "OwnGoals",
];
// PLACE ARRAYS IN A MAP IN ORDER FOR "sortTable" METHOD TO PROPERLY RETRIEVE DATA ATTRIBUTES
let tableFields = new Map();
tableFields
  .set("fullTable", fullTable)
  .set("homePageFields", homePageFields)
  .set("playersTable", playersTable);

let tableDataSource = new Map();
tableDataSource
  .set(
    "TeamStats.groupTeamsAllTimeSeasonStats",
    TeamStats.groupTeamsAllTimeSeasonStats
  )
  .set(
    "TeamStats.groupTeamsAllTimePlayoffStats",
    TeamStats.groupTeamsAllTimePlayoffStats
  )
  .set("TeamStats.groupTeamsAllTimeStats", TeamStats.groupTeamsAllTimeStats)
  .set(
    "IndividualPlayerStats.groupPlayersAllTimeSeasonStats",
    IndividualPlayerStats.groupPlayersAllTimeSeasonStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersAllTimePlayoffStats",
    IndividualPlayerStats.groupPlayersAllTimePlayoffStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersAllTimeStats",
    IndividualPlayerStats.groupPlayersAllTimeStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersSeason1SeasonStats",
    IndividualPlayerStats.groupPlayersSeason1SeasonStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersSeason1PlayoffStats",
    IndividualPlayerStats.groupPlayersSeason1PlayoffStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersSeason1CombinedStats",
    IndividualPlayerStats.groupPlayersSeason1CombinedStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersSeason2SeasonStats",
    IndividualPlayerStats.groupPlayersSeason2SeasonStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersSeason2PlayoffStats",
    IndividualPlayerStats.groupPlayersSeason2PlayoffStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersSeason2CombinedStats",
    IndividualPlayerStats.groupPlayersSeason2CombinedStats
  );

// TH,TD OF TABLE ONCLICK SORTING
// used within hax94Listeners setTableListeners function

export function sortTable(event) {
  let caption = document.querySelector("table caption > h1");
  let tableName = caption.textContent;
  let dataName = event.target.dataset.dataSource;
  let data = tableDataSource.get(dataName);
  let color = "w3-yellow";
  let sortBy = event.target.dataset.fieldName;
  let arrayName = event.target.dataset.arraySource;
  let arraySource = tableFields.get(arrayName);
  createTable(tableName, dataName, data, color, sortBy, arrayName, arraySource);
  setTableListeners();
}

/////////////////// TABLE DESIGN

// create table for all teams and players overall standings
export function createTable(
  tableName,
  dataSourceName,
  dataSource,
  color,
  sortBy = "Points",
  fieldsArrayName,
  ...fieldsArray
) {
  sortGroupedStats(dataSource, sortBy);
  let tableHeaders = fieldsArray[0];
  let fieldsLength = fieldsArray[0].length; // named array of fields previously made
  let browserWidth = window.innerWidth;
  let playerStats = "";
  // html table begin
  playerStats = "<table>";
  // html table caption
  playerStats += `<caption><h1>${tableName}</h1></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    playerStats +=
      `<th data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
      tableHeaders[i] +
      " >" +
      tableHeaders[i] +
      "</th>";
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  dataSource.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      if (tableHeaders[j] == sortBy) {
        playerStats +=
          `<td data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} class=${color} data-field-name=` + //data-fieldNames required for mobile layout
          tableHeaders[j] +
          " >" +
          item.get(tableHeaders[j]) +
          "</td>";
      } else {
        playerStats +=
          `<td  data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
          tableHeaders[j] +
          " >" +
          item.get(tableHeaders[j]) +
          "</td>";
      }
    }
    playerStats += "</tr>";
  });

  // html table ends
  playerStats += "</table>";
  closeSidebar();
  clearScoreboardDiv();

  // display table on web page
  getTablesDiv(); // import function
  tablesDiv.innerHTML = playerStats;
}
// END overall table leaders

///////// END TABLE DESIGN

// button for game results table within teams layout page

export function getTeamsGameResults(e) {
  let team = e.target.dataset.teamName;
  let teamImage = e.target.dataset.teamLogo;
  let seasonNum = e.target.dataset.seasonNum;
  let gameType = e.target.dataset.gameType; // 1="Season" 2="Playoff"

  let teamsGames;
  let gameResults = "";

  teamsGames =
    TeamStats.allTeamStats[team][
      "teamsSeason" + seasonNum + gameType + "Stats"
    ][0];
  let gamesLength = teamsGames.length;
  gameResults = `<h1>${team}</h1>`;
  gameResults += `<h4>S0${seasonNum} ${gameType}</h4>`;
  if (gamesLength > 0) {
    for (let i = 0; i < gamesLength; i++) {
      gameResults += `<div style="display: flex; justify-content: center">`;
      // class gameResults is containing grid
      gameResults += `<div class="w3-container w3-margin gameResults">`;
      // homeTeam logo
      gameResults += `<div class="homeTeamLogo w3-card w3-blue">`;
      if (team == `${teamsMAP.get(+teamsGames[i].TeamOne)}`) {
        gameResults += `<img src=${teamImage} style="width:25px;height:25px;">`;
      } else {
        let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
        let otherTeamsObject = teams.filter(
          (item) => item.TeamName == otherTeam
        );
        gameResults += `<img src=${otherTeamsObject[0].S01HomeFilePath} style="width:25px;height:25px;">`;
      }
      gameResults += `</div>`;
      // homeTeam name
      gameResults += `<div class="homeTeam"`;
      if (team == `${teamsMAP.get(+teamsGames[i].TeamOne)}`) {
        gameResults += `style="background-color: #${teamsColorMAP.get(
          team
        )}; color: #ffffff;">`;
      } else {
        let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
        gameResults += `style="background-color: #${teamsColorMAP.get(
          otherTeam
        )}; color: #ffffff;">`;
      }
      gameResults += `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
      gameResults += `</div>`;
      // homeScore
      if (+`${teamsGames[i].TeamOneScore}` > +`${teamsGames[i].TeamTwoScore}`) {
        gameResults += `<div class="homeScore w3-green">`;
      } else if (
        +`${teamsGames[i].TeamOneScore}` == +`${teamsGames[i].TeamTwoScore}`
      ) {
        gameResults += `<div class="homeScore w3-dark-gray">`;
      } else {
        gameResults += `<div class="homeScore w3-red">`;
      }
      gameResults += `${+teamsGames[i].TeamOneScore}`;
      gameResults += `</div>`;
      // awayTeam
      gameResults += `<div class="awayTeam"`;
      if (team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}`) {
        gameResults += `style="background-color: #${teamsColorMAP.get(
          team
        )}; color: #ffffff;">`;
      } else {
        let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
        gameResults += `style="background-color: #${teamsColorMAP.get(
          otherTeam
        )}; color: #ffffff;">`;
      }
      gameResults += ` ${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
      gameResults += `</div>`;
      // awayTeam logo
      gameResults += `<div class="awayTeamLogo w3-card w3-blue">`;
      if (team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}`) {
        gameResults += `<img src=${teamImage} style="width:25px;height:25px;">`;
      } else {
        let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
        let otherTeamsObject = teams.filter(
          (item) => item.TeamName == otherTeam
        );
        gameResults += `<img src=${otherTeamsObject[0].S01HomeFilePath} style="width:25px;height:25px;">`;
      }
      gameResults += `</div>`;
      // awayTeam score
      if (+`${teamsGames[i].TeamOneScore}` < +`${teamsGames[i].TeamTwoScore}`) {
        gameResults += `<div class="awayScore w3-green">`;
      } else if (
        +`${teamsGames[i].TeamTwoScore}` == +`${teamsGames[i].TeamOneScore}`
      ) {
        gameResults += `<div class="awayScore w3-dark-gray">`;
      } else {
        gameResults += `<div class="awayScore w3-red">`;
      }
      gameResults += `${+teamsGames[i].TeamTwoScore}`;
      gameResults += `</div>`;
      gameResults += `</div>`;
      gameResults += `</div>`;
    }
  } else {
    gameResults += `<h4>No games played</h4>`;
  }

  // change header banner when team is selected from navbar
  setHeaderBanner(teamImage, team);

  // change bodies background color to that of team selected
  document.body.style.backgroundColor = `#${teamsColorMAP.get(team)}`;

  // display data in correct div and clear previous data
  clearTablesDiv();
  let scores = document.getElementById("scoreboardDiv");
  scores.innerHTML = gameResults;
}

// create TEAMS COLOR layout from button click within teams layout div
export function teamColorsPage(e) {
  clearTablesDiv();
  clearScoreboardDiv();
  getTablesDiv();
  let team = e.target.dataset.teamName;
  // let seasonNum = "01";
  let seasonNum = e.target.dataset.seasonNum;
  let teamLogoSrc = eachTeamObjectMAP.get(team)[`S0${seasonNum}HomeFilePath`];
  let homeColorScheme = eachTeamObjectMAP.get(team)[`S0${seasonNum}Home`];
  let awayTeamLogo = eachTeamObjectMAP.get(team)[`S0${seasonNum}AwayFilePath`];
  let awayColorScheme = eachTeamObjectMAP.get(team)[`S0${seasonNum}Away`];
  let teamLogosLayout;
  let tLL = teamLogosLayout;
  // teamsColorsLayout is grid containing class
  tLL = `<div class="w3-container w3-margin teamColorsLayout">`;
  // teamColorsLayout class that contains the title in colors layout
  tLL += `<div class="teamColorsHeader w3-blue w3-round-large">`;
  tLL += `<h4 class="w3-text-black">Copy teams color to clipboard</h4>`;
  tLL += `</div>`;
  // teamColorsLayout body of layout containing team logos
  // begin flex items containing team logo cards
  // opening teamColorsHomeContent
  tLL += `<div class="teamColorsHomeContent w3-container w3-padding w3-blue w3-round-large">`;
  tLL += `<div class="w3-card-4 w3-padding w3-yellow w3-round-large">`;
  tLL += `<div><h5>Home</h5></div>`;
  tLL += `<img src="${teamLogoSrc}">`;
  // container holding red blue buttons
  tLL += `<div class="w3-container w3-padding redBlue">`;
  // red button container
  tLL += `<div data-color-scheme="${
    "/colors red" + " " + homeColorScheme
  }" class="w3-padding w3-round w3-center w3-red red">`;
  tLL += `red`;
  // closing red button container
  tLL += `</div>`;
  // blue button container
  tLL += `<div data-color-scheme="${
    "/colors blue" + " " + homeColorScheme
  }" class="w3-padding w3-round w3-center w3-blue blue">`;
  tLL += `blue`;
  // closing blue button container
  tLL += `</div>`;
  // closing red blue container
  tLL += `</div>`;
  // closing card containing logo
  tLL += `</div>`;
  //closing teamColorsHomeContent
  tLL += `</div>`;
  // opening teamColorsAwayContent
  tLL += `<div class="teamColorsAwayContent w3-container w3-padding w3-blue w3-round-large">`;
  tLL += `<div class="w3-card-4 w3-padding w3-yellow w3-round-large">`;
  tLL += `<div><h5>Alternate</h5></div>`;
  tLL += `<img src="${awayTeamLogo}">`;
  // container holding red blue buttons
  tLL += `<div class="w3-container w3-padding redBlue">`;
  // red button container
  tLL += `<div data-color-scheme="${
    "/colors red" + " " + awayColorScheme
  }" class="w3-padding w3-round w3-center w3-red red">`;
  tLL += `red`;
  // closing red button container
  tLL += `</div>`;
  // blue button container
  tLL += `<div data-color-scheme="${
    "/colors blue" + " " + awayColorScheme
  }" class="w3-padding w3-round w3-center w3-blue blue">`;
  tLL += `blue`;
  // closing blue button container
  tLL += `</div>`;
  // closing red blue container
  tLL += `</div>`;
  // closing card containing logo
  tLL += `</div>`;
  //closing teamColorsAwayContent
  tLL += `</div>`;
  //closing teamColorsLayout
  tLL += `</div>`;

  tablesDiv.innerHTML += `${tLL}`;

  // create function to copy color red/blue scheme

  function getColorScheme(e) {
    let scheme = e.target.dataset.colorScheme;
    navigator.clipboard.writeText(scheme);
    console.log("after clipboard!");
  }

  // set listeners on newly created red/blue button elements
  let redBlueButtons = document.querySelectorAll("div[data-color-scheme]");
  redBlueButtons.forEach((item) =>
    item.addEventListener("click", getColorScheme)
  );
}

// listener function for selecting red/blue color scheme

// END TEAMS COLOR layout button clicks

// CREATE LAYOUT FOR TEAMS PAGE

export function setTeamsPageLayout(e) {
  clearTablesDiv();
  clearScoreboardDiv();
  getTablesDiv();
  let team = e.target.dataset.teamName;
  let teamLogoSrc = e.target.src;
  let seasonNum = e.target.dataset.seasonNum;
  let teamsSeasonObject =
    TeamStats.allTeamStats[team][`teamsSeason${seasonNum}SeasonStatsMAP`];
  let wins = teamsSeasonObject.get("Wins");
  let losses = teamsSeasonObject.get("Losses");
  let draws = teamsSeasonObject.get("Draws");

  // class teamsLayout is grid container
  let teamsLayout;
  // 4 divs make up the grid. (teamName, gameType, notes, scoreboard and teamColors)
  teamsLayout = `<div class="w3-container w3-margin teamsLayout">`;
  // team name grid area
  teamsLayout += `<div class="teamName">`;
  teamsLayout += `<h1>${team}</h1>`;
  teamsLayout += `</div>`;
  // gametype grid area
  teamsLayout += `<div class="gameType">`;
  teamsLayout += `<h3>Season ${seasonNum}</h3>`;
  teamsLayout += `</div>`;
  // teams season record grid area
  teamsLayout += `<div class="teamRecord">`;
  teamsLayout += `<h3>(${wins} - ${losses} - ${draws})</h3>`;
  teamsLayout += `</div>`;

  // players grid area
  teamsLayout += `<div
   data-team-name="${team}"
   data-team-logo="${teamLogoSrc}"
   data-season-num="${seasonNum}"
   data-game-type="Season"
   class="w3-round w3-green players"
   >`;
  teamsLayout += `Players`;
  teamsLayout += `</div>`;
  // notes grid area **bottom of webpage**
  teamsLayout += `<div class="notes">`;
  teamsLayout += `<h5>More options will be placed here</h5>`;
  teamsLayout += `</div>`;
  // season scoreboard grid area
  teamsLayout += `<div
    data-team-name="${team}"
    data-team-logo="${teamLogoSrc}"
    data-season-num="${seasonNum}"
    data-game-type="Season"
    class="w3-round seasonScoreboard"
    >`;
  teamsLayout += `Season Results`;
  teamsLayout += `</div>`;
  // playoff scoreboard grid area
  teamsLayout += `<div
    data-team-name="${team}"
    data-team-logo="${teamLogoSrc}"
    data-season-num="${seasonNum}"
    data-game-type="Playoff"
    class="w3-round playoffScoreboard"
    >`;
  teamsLayout += `Playoff Results`;
  teamsLayout += `</div>`;
  // teamColors grid area
  teamsLayout += `<div
    data-team-name="${team}"
    data-season-num="${seasonNum}"
    style="background-color: #${teamsColorMAP.get(team)}"
    class="w3-round teamColors"
  >`;
  teamsLayout += `Team Colors`;
  teamsLayout += `</div>`;
  teamsLayout += `</div>`;
  tablesDiv.innerHTML = teamsLayout;

  // change header banner when team is selected from navbar
  setHeaderBanner(teamLogoSrc, team);

  // change bodies background color to that of team selected
  document.body.style.backgroundColor = `#${teamsColorMAP.get(team)}`;
  // sets tables for that teams players stats for that season
  let playersArea = document.querySelector(".players");
  playersArea.addEventListener("click", getTeamsPlayersPerSeason);
  let teamColorsArea = document.querySelector(".teamColors");
  teamColorsArea.style.backgroundColor = `#${teamsColorMAP.get(team)}`;
  // set listeners on newly created elements (buttons) once entering teams layout page
  let seasonGamesResultsArea = document.querySelector(".seasonScoreboard");
  seasonGamesResultsArea.addEventListener("click", getTeamsGameResults);
  let playoffGamesResultsArea = document.querySelector(".playoffScoreboard");
  playoffGamesResultsArea.addEventListener("click", getTeamsGameResults);
  teamColorsArea.addEventListener("click", teamColorsPage);
}

// END TEAMS PAGE LAYOUT

// TABLE CREATION
// update the tableDataSource MAP up above!!
// be sure to add "setTableListeners" function needed for sidebar link. resets listeners to table
console.log(TeamStats);
console.log(IndividualPlayerStats);
// TEAMS
// S01 regular season
export function setHomeTable() {
  createTable(
    "S01 Regular Season",
    "TeamStats.groupTeamsAllTimeSeasonStats",
    TeamStats.groupTeamsAllTimeSeasonStats,
    "w3-yellow",
    "Points",
    "fullTable",
    fullTable
  );
  setTableListeners();
  document.body.style.backgroundColor = "#2196f3";
  let headerImage = document.querySelector("#championsCard>div>img");
  headerImage.src = "img/teamLogos/haxualChocolateHomeS01.svg";
  let header = document.getElementById("headerTeamName");
  let headerChildren = header.childNodes;
  headerChildren[4].textContent = "Haxual Chocolate";
  let trophy = document.querySelector("i");
  trophy.classList.add("fa-trophy");
}

// S01 Playoff
export function setPlayoffTable() {
  createTable(
    "S01 Playoffs",
    "TeamStats.groupTeamsAllTimePlayoffStats",
    TeamStats.groupTeamsAllTimePlayoffStats,
    "w3-yellow",
    "Points",
    "fullTable",
    fullTable
  );
  setTableListeners();
}
// PLAYERS
// S01 regular season
export function setPlayerS01Season() {
  createTable(
    "S01 Regular Season",
    "IndividualPlayerStats.groupPlayersAllTimeSeasonStats",
    IndividualPlayerStats.groupPlayersAllTimeSeasonStats,
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setTableListeners();
}

// S01 Playoff
export function setPlayerS01Playoff() {
  createTable(
    "S01 Playoffs",
    "IndividualPlayerStats.groupPlayersAllTimePlayoffStats",
    IndividualPlayerStats.groupPlayersAllTimePlayoffStats,
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setTableListeners();
}

// S01 Combined

export function setPlayerS01Combined() {
  createTable(
    "S01 All Points",
    "IndividualPlayerStats.groupPlayersAllTimeStats",
    IndividualPlayerStats.groupPlayersAllTimeStats,
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setTableListeners();
}
// set home page table
setHomeTable();

// END TABLE CREATION

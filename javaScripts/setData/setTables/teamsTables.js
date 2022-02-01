import { TeamStats } from "../createTeams.js";
import { IndividualPlayerStats } from "../createPlayers.js";
import {
  teams,
  teamsMAP,
  teamsColorMAP,
  seasonCountLength,
} from "../../importJSON/masterVars.js";
import sortGroupedStats from "../../sort.js";
import { setTableListeners } from "../../oldDesign/hax94Listeners.js";
import { closeSidebar } from "../../oldDesign/hax94.js";
import {
  // seasonMode,
  // teamStatsFieldsAbbreviated,
  // teamStatsFieldNamesMAP,
  // teamStatsFields,
  //   allTimeStatsArray,
  //   allTimeStatsMAPS,
  groupedAllTimeTeamStats,
  //   statsType,
} from "../../classFiles/teamStats.js";
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

  // display table on web page
  let standings = document.getElementById("tablesDiv");
  standings.innerHTML = playerStats;
}
// END overall table leaders

// game results table

export function getTeamsGameResults(e, seasonCountLength) {
  // console.log(TeamStats.allTeamStats[e.target.dataset.teamName]);
  console.log(teamsColorMAP);
  //let team = TeamStats.allTeamStats[teamsMAP.get(4)].name;
  let team = e.target.dataset.teamName;

  let teamsGames;
  let gameResults = "";
  if (seasonCountLength > 1) {
    teamsGames =
      TeamStats.allTeamStats[team]["teamsSeason" + "1" + "CombinedStats"];
  } else {
    teamsGames = TeamStats.allTeamStats[team].allTimeSeasonStats;
  }
  let gamesLength = teamsGames.length;

  for (let i = 0; i < gamesLength; i++) {
    gameResults += `<div style="display: flex; justify-content: center">`;
    gameResults += `<div
      style="
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 50% 50%;
        width: 50%;
      "
      class="w3-container w3-margin"
    >`;
    gameResults += `<div class="homeTeam" style="background-color: #000000; color: #ffffff;">`;
    gameResults += `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
    gameResults += `</div>`;
    gameResults += `<div class="homeScore w3-aqua">`;
    gameResults += `${+teamsGames[i].TeamOneScore}`;
    gameResults += `</div>`;
    gameResults += `<div class="awayTeam w3-purple">`;
    gameResults += ` ${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
    gameResults += `</div>`;
    gameResults += `<div class="awayScore w3-pink">`;
    gameResults += `${+teamsGames[i].TeamTwoScore}`;
    gameResults += `</div>`;
    gameResults += `</div>`;
    gameResults += `</div>`;
    // x.append(gameResults);
  }

  // also delete listener on body tag that tests this function
  // edit below this once completed
  let previousData = document.getElementById("tablesDiv");
  previousData.innerHTML = "";
  let scores = document.getElementById("scoreboardDiv");
  scores.innerHTML = gameResults;
}

///////// END TABLE DESIGN

// TABLE CREATION
// update the tableDataSource MAP up above!!
// be sure to add "setTableListeners" function needed for sidebar link. resets listeners to table

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

import { teamPlayers, playersMAP, teamsNumMAP } from "../../json/masterVars.js";
import { IndividualPlayerStats } from "../classFiles/individualPlayerStats.js";
import { clearScoreboardDiv, clearTablesDiv } from "./variousFunctions.js";
import sortGroupedStats from "./sort.js";

let playersTable = [
  "Name",
  "Goals",
  "Assists",
  "Points",
  "Kicks",
  "Passes",
  "ShotsOnGoal",
];
let fieldsLength = playersTable.length;

export function getTeamsPlayersPerSeason(e) {
  clearTablesDiv();
  clearScoreboardDiv();
  let team = teamsNumMAP.get(e.target.dataset.teamName);
  // let seasonMode = e.target.dataset.gameType;
  let seasonNum = e.target.dataset.seasonNum;
  // grab players who played on this team
  let playersFiltered = teamPlayers.filter(
    (item) => item.TeamID == team && item.SeasonNumber == seasonNum
  );
  // enter players on this team into an array
  let playersArray = [];
  playersFiltered.forEach((item) =>
    playersArray.push(playersMAP.get(+item.PlayerID))
  );
  // push those players seasons stats into team array and sort by points
  let playerSeasonObjects = [];
  playersArray.forEach((item) =>
    playerSeasonObjects.push(
      IndividualPlayerStats.allPlayersStats[item].allTimeSeasonStatsMAP
    )
  );
  sortGroupedStats(playerSeasonObjects, "Points");
  // push those players playoff stats into team array and sort by points
  let playerPlayoffObjects = [];
  playersArray.forEach((item) =>
    playerPlayoffObjects.push(
      IndividualPlayerStats.allPlayersStats[item].allTimePlayoffStatsMAP
    )
  );
  sortGroupedStats(playerPlayoffObjects, "Points");
  // push those players full season combined stats into team array and sort by points
  let playerCombinedObjects = [];
  playersArray.forEach((item) =>
    playerCombinedObjects.push(
      IndividualPlayerStats.allPlayersStats[item].allTimeStatsMAP
    )
  );
  sortGroupedStats(playerCombinedObjects, "Points");
  let playerStats = "";
  playerStats = `<h1>Season ${seasonNum}</h1>`;
  // html table season stats begin

  playerStats += "<table>";
  // html table caption
  playerStats += `<caption><h3>Regular Season</h3></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    playerStats +=
      `<th data-field-name=` + //data-fieldNames required for mobile layout
      playersTable[i] +
      " >" +
      playersTable[i] +
      "</th>";
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  playerSeasonObjects.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      playerStats +=
        `<td data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[j] +
        " >" +
        item.get(playersTable[j]) +
        "</td>";
    }
    playerStats += "</tr>";
  });

  // html table ends
  playerStats += "</table>";

  // html table playoff stats begin
  playerStats += "<table>";
  // html table caption
  playerStats += `<caption><h3>Playoffs</h3></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    playerStats +=
      `<th data-field-name=` + //data-fieldNames required for mobile layout
      playersTable[i] +
      " >" +
      playersTable[i] +
      "</th>";
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  playerPlayoffObjects.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      playerStats +=
        `<td data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[j] +
        " >" +
        item.get(playersTable[j]) +
        "</td>";
    }
    playerStats += "</tr>";
  });

  // html table ends
  playerStats += "</table>";

  // html table playoff stats begin
  playerStats += "<table>";
  // html table caption
  playerStats += `<caption><h3>All Stats</h3></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    playerStats +=
      `<th data-field-name=` + //data-fieldNames required for mobile layout
      playersTable[i] +
      " >" +
      playersTable[i] +
      "</th>";
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  playerCombinedObjects.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      playerStats +=
        `<td data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[j] +
        " >" +
        item.get(playersTable[j]) +
        "</td>";
    }
    playerStats += "</tr>";
  });

  // html table ends
  playerStats += "</table>";

  let playerStatsTable = document.getElementById("scoreboardDiv");
  playerStatsTable.style.display = "flex";
  playerStatsTable.style.flexDirection = "column";
  playerStatsTable.style.alignItems = "center";
  playerStatsTable.innerHTML = playerStats;
}

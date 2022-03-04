import {
  teamPlayers,
  playersMAP,
  teamsMAP,
  teamsNumMAP,
  eachTeamObjectMAP,
} from "../../json/masterVars.js";
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
  "OwnGoals",
];
let fieldsLength = playersTable.length;

export function getTeamsPlayersPerSeason(e) {
  clearTablesDiv();
  clearScoreboardDiv();
  let team = teamsNumMAP.get(e.target.dataset.teamName);
  let teamColor = `#${eachTeamObjectMAP.get(teamsMAP.get(team)).MainColor}`;
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
      IndividualPlayerStats.allPlayersStats[item][
        `playersSeason${seasonNum}SeasonStatsMAP`
      ]
    )
  );
  sortGroupedStats(playerSeasonObjects, "Points");
  // push those players playoff stats into team array and sort by points
  let playerPlayoffObjects = [];
  playersArray.forEach((item) =>
    playerPlayoffObjects.push(
      IndividualPlayerStats.allPlayersStats[item][
        `playersSeason${seasonNum}PlayoffStatsMAP`
      ]
    )
  );
  sortGroupedStats(playerPlayoffObjects, "Points");
  // push those players full season combined stats into team array and sort by points
  let playerCombinedObjects = [];
  playersArray.forEach((item) =>
    playerCombinedObjects.push(
      IndividualPlayerStats.allPlayersStats[item][
        `playersSeason${seasonNum}CombinedStatsMAP`
      ]
    )
  );
  sortGroupedStats(playerCombinedObjects, "Points");
  // var containing the innerHTML of tables
  let playerStats = "";

  playerStats += `<h1>Season ${seasonNum}</h1>`;
  playerStats += `<div class="w3-padding w3-card-4 w3-round-large" style="color:#fff;background-color:${teamColor};">`;
  playersArray.forEach(
    (item) =>
      (playerStats += `
    <div style="font-size: 1.2em;">${item}</div>`)
  );
  playerStats += `</div>`;
  playerStats += `<h6>*These tables are currently not sortable*</h6>`;
  // html table season stats begin
  playerStats += "<table>";
  // html table caption
  playerStats += `<caption><h3>Regular Season</h3></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    if (playersTable[i] == "Points") {
      playerStats +=
        `<th data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[i] +
        ` class="w3-orange">` +
        playersTable[i] +
        "</th>";
    } else {
      playerStats +=
        `<th data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[i] +
        " >" +
        playersTable[i] +
        "</th>";
    }
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  playerSeasonObjects.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      if (playersTable[j] == "Points") {
        playerStats +=
          `<td data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[j] +
          ` class="w3-yellow">` + // add yellow background for sorted column points
          item.get(playersTable[j]) +
          "</td>";
      } else {
        playerStats +=
          `<td data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[j] +
          " >" +
          item.get(playersTable[j]) +
          "</td>";
      }
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
    if (playersTable[i] == "Points") {
      playerStats +=
        `<th data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[i] +
        ` class="w3-orange">` +
        playersTable[i] +
        "</th>";
    } else {
      playerStats +=
        `<th data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[i] +
        " >" +
        playersTable[i] +
        "</th>";
    }
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  playerPlayoffObjects.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      if (playersTable[j] == "Points") {
        playerStats +=
          `<td data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[j] +
          ` class="w3-yellow">` + // add yellow background for sorted column points
          item.get(playersTable[j]) +
          "</td>";
      } else {
        playerStats +=
          `<td data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[j] +
          " >" +
          item.get(playersTable[j]) +
          "</td>";
      }
    }
    playerStats += "</tr>";
  });

  // html table ends
  playerStats += "</table>";

  // html table playoff stats begin
  playerStats += "<table>";
  // html table caption
  playerStats += `<caption><h3>Combined Stats</h3></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    if (playersTable[i] == "Points") {
      playerStats +=
        `<th data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[i] +
        ` class="w3-orange">` +
        playersTable[i] +
        "</th>";
    } else {
      playerStats +=
        `<th data-field-name=` + //data-fieldNames required for mobile layout
        playersTable[i] +
        " >" +
        playersTable[i] +
        "</th>";
    }
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  playerCombinedObjects.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";

    for (let j = 0; j < fieldsLength; j++) {
      if (playersTable[j] == "Points") {
        playerStats +=
          `<td data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[j] +
          ` class="w3-yellow">` + // add yellow background for sorted column points
          item.get(playersTable[j]) +
          "</td>";
      } else {
        playerStats +=
          `<td data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[j] +
          " >" +
          item.get(playersTable[j]) +
          "</td>";
      }
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

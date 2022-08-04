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
import { setTeamsPageLayout } from "../setData/setTables/teamsTables.js";

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
let fieldsLength = playersTable.length;

export function getTeamsPlayersPerSeason(
  e,
  thisTeam,
  thisSeasonNumber,
  thisTeamLogo
) {
  clearTablesDiv();
  clearScoreboardDiv();
  let team, teamName, teamColor, seasonNum, teamImage;
  if (e !== false) {
    team = teamsNumMAP.get(e.target.dataset.teamName);
    teamName = teamsMAP.get(+team);
    teamColor = `#${eachTeamObjectMAP.get(teamsMAP.get(team)).MainColor}`;
    seasonNum = e.target.dataset.seasonNum;
    teamImage = e.target.dataset.teamLogo; // used for the back button
  } else {
    team = teamsNumMAP.get(thisTeam);
    teamName = teamsMAP.get(+team);
    teamColor = `#${eachTeamObjectMAP.get(teamsMAP.get(team)).MainColor}`;
    seasonNum = thisSeasonNumber;
    teamImage = thisTeamLogo; // used for the back button
  }
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
  playerStats += `<button id="playerStatsBackButton" class="w3-btn w3-round-large" style="background-color:${teamColor}; color: #ffffff;" data-team-name="${teamName}" data-team-logo="${teamImage}" data-season-num="${seasonNum}">back</button>`;
  playerStats += `<h1>Season ${seasonNum}</h1>`;
  playerStats += `<div class="w3-padding w3-card-4 w3-round-large" style="color:#fff;background-color:${teamColor};">`;
  playersArray.forEach(
    (item) =>
      (playerStats += `
    <div style="font-size: 1.2em;">${item}</div>`)
  );
  playerStats += `</div>`;

  //***************REMEMBER TO TRANSFER THE ID NAME OF BELOW DIV TO PLAYERS NAMES DIV WHEN DELETING THIS MESSAGE******************************************** */
  playerStats += `<div id="teamPlayerList" style="margin: auto; margin-top: 15px; width:70%; background-color: rgb(34, 184, 34);"><h5>These tables are now sortable</h5></div>`;
  // html table season stats begin
  playerStats += "<table id='teamPlayerSeasonTable'>";
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
        `<th  data-field-name=` + //data-fieldNames required for mobile layout
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
  if (playerPlayoffObjects[0].get("GP") > 0) {
    playerStats += "<table id='teamPlayerPlayoffTable'>";
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

    // html table combined stats begin
    playerStats += "<table id='teamPlayerCombinedTable'>";
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
  } else {
    playerStats += "<h3>No playoff games were played</h3>";
  }

  let playerStatsTable = document.getElementById("scoreboardDiv");
  playerStatsTable.style.display = "flex";
  playerStatsTable.style.flexDirection = "column";
  playerStatsTable.style.alignItems = "center";
  playerStatsTable.innerHTML = playerStats;

  let playerNameCells = document.querySelectorAll("td[data-field-name='Name']");
  playerNameCells.forEach((item) => {
    item.style.color = "#fff";
    item.style.backgroundColor = teamColor;
  });

  // listener for the back button back to teams layout Page
  document
    .getElementById("playerStatsBackButton")
    .addEventListener("click", setTeamsPageLayout);
  // end back button

  ////////////////////BEGIN OF SORTINGFUNCTIONS FOR THE ABOVE 3 TABLES//////////////////////////////
  // regular season sorting and listening function
  function sortTeamPlayersSeasonTable(e) {
    let sortBy = e.target.dataset.fieldName;
    sortGroupedStats(playerSeasonObjects, sortBy);
    let teamPlayersSeasonTable = "";
    // html table season stats begin
    teamPlayersSeasonTable += "<table id='teamPlayerSeasonTable'>";
    // html table caption
    teamPlayersSeasonTable += `<caption><h3>Regular Season</h3></caption>`;
    // html table thead
    teamPlayersSeasonTable += "<thead><tr>";
    for (let i = 0; i < fieldsLength; i++) {
      if (playersTable[i] == sortBy) {
        teamPlayersSeasonTable +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          ` class="w3-orange">` +
          playersTable[i] +
          "</th>";
      } else {
        teamPlayersSeasonTable +=
          `<th  data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          " >" +
          playersTable[i] +
          "</th>";
      }
    }
    teamPlayersSeasonTable += "</tr></thead>";
    // end of html table header fields row

    playerSeasonObjects.forEach((item) => {
      // table data begins for each field
      teamPlayersSeasonTable += "<tr>";

      for (let j = 0; j < fieldsLength; j++) {
        if (playersTable[j] == sortBy) {
          teamPlayersSeasonTable +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            ` class="w3-yellow">` + // add yellow background for sorted column points
            item.get(playersTable[j]) +
            "</td>";
        } else {
          teamPlayersSeasonTable +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            " >" +
            item.get(playersTable[j]) +
            "</td>";
        }
      }
      teamPlayersSeasonTable += "</tr>";
    });

    // html table ends
    teamPlayersSeasonTable += "</table>";
    /////////////////////////////////////////////////////////////////////////////
    let seasonTable = document.getElementById("teamPlayerSeasonTable");
    let position = document.querySelector("#teamPlayerList");
    seasonTable.remove();
    position.insertAdjacentHTML("afterend", teamPlayersSeasonTable);

    setTeamPlayerSeasonTableListeners(); // this resets the listeners on the table after being redisplayed

    let playerNameCells = document.querySelectorAll(
      "td[data-field-name='Name']"
    );
    playerNameCells.forEach((item) => {
      item.style.color = "#fff";
      item.style.backgroundColor = teamColor;
    });
  }

  // listeners on table headers for sorting table on larger screens
  function setTeamPlayerSeasonTableListeners() {
    let browserWidth = window.innerWidth;
    if (browserWidth < 982) {
      let mobileTableCells = document.querySelectorAll(
        "#teamPlayerSeasonTable td"
      );
      let eachCell = Array.from(mobileTableCells);
      eachCell.forEach((field) =>
        field.addEventListener("click", sortTeamPlayersSeasonTable)
      );
    } else {
      let getFieldNames = document.querySelectorAll(
        "#teamPlayerSeasonTable th"
      );
      let headers = Array.from(getFieldNames);
      headers.forEach((field) =>
        field.addEventListener("click", sortTeamPlayersSeasonTable)
      );
    }
  }
  setTeamPlayerSeasonTableListeners();

  // playoffs sorting and listening functions
  function sortTeamPlayersPlayoffTable(e) {
    let sortBy = e.target.dataset.fieldName;
    sortGroupedStats(playerPlayoffObjects, sortBy);
    let teamPlayersPlayoffTable = "";
    // html table season stats begin
    teamPlayersPlayoffTable += "<table id='teamPlayerPlayoffTable'>";
    // html table caption
    teamPlayersPlayoffTable += `<caption><h3>Playoffs</h3></caption>`;
    // html table thead
    teamPlayersPlayoffTable += "<thead><tr>";
    for (let i = 0; i < fieldsLength; i++) {
      if (playersTable[i] == sortBy) {
        teamPlayersPlayoffTable +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          ` class="w3-orange">` +
          playersTable[i] +
          "</th>";
      } else {
        teamPlayersPlayoffTable +=
          `<th  data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          " >" +
          playersTable[i] +
          "</th>";
      }
    }
    teamPlayersPlayoffTable += "</tr></thead>";
    // end of html table header fields row

    playerPlayoffObjects.forEach((item) => {
      // table data begins for each field
      teamPlayersPlayoffTable += "<tr>";

      for (let j = 0; j < fieldsLength; j++) {
        if (playersTable[j] == sortBy) {
          teamPlayersPlayoffTable +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            ` class="w3-yellow">` + // add yellow background for sorted column points
            item.get(playersTable[j]) +
            "</td>";
        } else {
          teamPlayersPlayoffTable +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            " >" +
            item.get(playersTable[j]) +
            "</td>";
        }
      }
      teamPlayersPlayoffTable += "</tr>";
    });

    // html table ends
    teamPlayersPlayoffTable += "</table>";
    /////////////////////////////////////////////////////////////////////////////
    let playoffTable = document.getElementById("teamPlayerPlayoffTable");
    let position = document.querySelector("#teamPlayerCombinedTable");
    playoffTable.remove();
    position.insertAdjacentHTML("beforebegin", teamPlayersPlayoffTable);
    setTeamPlayerPlayoffTableListeners(); // this resets the listeners on the table after being redisplayed

    let playerNameCells = document.querySelectorAll(
      "td[data-field-name='Name']"
    );
    playerNameCells.forEach((item) => {
      item.style.color = "#fff";
      item.style.backgroundColor = teamColor;
    });
  }

  // listeners on table headers for sorting regular season table
  function setTeamPlayerPlayoffTableListeners() {
    let browserWidth = window.innerWidth;
    if (browserWidth < 982) {
      let mobileTableCells = document.querySelectorAll(
        "#teamPlayerPlayoffTable td"
      );
      let eachCell = Array.from(mobileTableCells);
      eachCell.forEach((field) =>
        field.addEventListener("click", sortTeamPlayersPlayoffTable)
      );
    } else {
      let getFieldNames = document.querySelectorAll(
        "#teamPlayerPlayoffTable th"
      );
      let headers = Array.from(getFieldNames);
      headers.forEach((field) =>
        field.addEventListener("click", sortTeamPlayersPlayoffTable)
      );
    }
  }
  setTeamPlayerPlayoffTableListeners();

  // combined stats for sorting and listening functions

  function sortTeamPlayerscombinedTable(e) {
    let sortBy = e.target.dataset.fieldName;
    sortGroupedStats(playerCombinedObjects, sortBy);
    let teamPlayersCombinedTable = "";
    // html table season stats begin
    teamPlayersCombinedTable += "<table id='teamPlayerCombinedTable'>";
    // html table caption
    teamPlayersCombinedTable += `<caption><h3>Combined Stats</h3></caption>`;
    // html table thead
    teamPlayersCombinedTable += "<thead><tr>";
    for (let i = 0; i < fieldsLength; i++) {
      if (playersTable[i] == sortBy) {
        teamPlayersCombinedTable +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          ` class="w3-orange">` +
          playersTable[i] +
          "</th>";
      } else {
        teamPlayersCombinedTable +=
          `<th  data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          " >" +
          playersTable[i] +
          "</th>";
      }
    }
    teamPlayersCombinedTable += "</tr></thead>";
    // end of html table header fields row

    playerCombinedObjects.forEach((item) => {
      // table data begins for each field
      teamPlayersCombinedTable += "<tr>";

      for (let j = 0; j < fieldsLength; j++) {
        if (playersTable[j] == sortBy) {
          teamPlayersCombinedTable +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            ` class="w3-yellow">` + // add yellow background for sorted column points
            item.get(playersTable[j]) +
            "</td>";
        } else {
          teamPlayersCombinedTable +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            " >" +
            item.get(playersTable[j]) +
            "</td>";
        }
      }
      teamPlayersCombinedTable += "</tr>";
    });

    // html table ends
    teamPlayersCombinedTable += "</table>";
    /////////////////////////////////////////////////////////////////////////////
    let combinedTable = document.getElementById("teamPlayerCombinedTable");
    let position = document.querySelector("#teamPlayerPlayoffTable");
    combinedTable.remove();
    position.insertAdjacentHTML("afterend", teamPlayersCombinedTable);
    setTeamPlayerCombinedTableListeners(); // this resets the listeners on the table after being redisplayed

    let playerNameCells = document.querySelectorAll(
      "td[data-field-name='Name']"
    );
    playerNameCells.forEach((item) => {
      item.style.color = "#fff";
      item.style.backgroundColor = teamColor;
    });
  }

  // listeners on table headers for sorting combined stats table
  function setTeamPlayerCombinedTableListeners() {
    let browserWidth = window.innerWidth;
    if (browserWidth < 982) {
      let mobileTableCells = document.querySelectorAll(
        "#teamPlayerCombinedTable td"
      );
      let eachCell = Array.from(mobileTableCells);
      eachCell.forEach((field) =>
        field.addEventListener("click", sortTeamPlayerscombinedTable)
      );
    } else {
      let getFieldNames = document.querySelectorAll(
        "#teamPlayerCombinedTable th"
      );
      let headers = Array.from(getFieldNames);
      headers.forEach((field) =>
        field.addEventListener("click", sortTeamPlayerscombinedTable)
      );
    }
  }
  setTeamPlayerCombinedTableListeners();
}

import {
  gameResults,
  gamePlayerStats,
  playersMAP,
  teamsMAP,
  eachTeamObjectMAP,
} from "../../json/masterVars.js";
import {
  clearScoreboardDiv,
  clearTablesDiv,
  getScoreboardDiv,
  getTablesDiv,
} from "./variousFunctions.js";
import sortGroupedStats from "./sort.js";

export default function setGamesData(e) {
  clearScoreboardDiv();
  clearTablesDiv();
  getScoreboardDiv();
  getTablesDiv();
  let displayGameData = "";
  let displayTeamLogos = "";
  let gameNumber = e.target.dataset.gameId;
  let thisSeasonNumber = gameResults.filter(
    (item) => item.GameID == gameNumber
  )[0].SeasonNumber;
  let thisGamesResult = gameResults.filter((item) => item.GameID == gameNumber);
  // begin home team
  let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
  let thisGamesHomeTeamColor = `#${
    eachTeamObjectMAP.get(thisGamesHomeTeam).MainColor
  }`;
  let thisGamesHomeTeamLogo =
    eachTeamObjectMAP.get(thisGamesHomeTeam)[
      `S0${thisSeasonNumber}HomeFilePath`
    ];
  let thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
  let thisGamesHomeTeamPossession = thisGamesResult[0].TeamOnePossession;
  let thisGamesHomeTeamShotsOnGoal = thisGamesResult[0].TeamOneShotsOnGoal;
  let thisGamesHomeTeamPasses = thisGamesResult[0].TeamOnePasses;
  let thisGamesHomeTeamKicks = thisGamesResult[0].TeamOneKicks;
  // end home team
  // begin away team
  let thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
  let thisGamesAwayTeamColor = `#${
    eachTeamObjectMAP.get(thisGamesAwayTeam).MainColor
  }`;
  let thisGamesAwayTeamLogo =
    eachTeamObjectMAP.get(thisGamesAwayTeam)[
      `S0${thisSeasonNumber}HomeFilePath`
    ];
  let thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
  let thisGamesAwayTeamPossession = thisGamesResult[0].TeamTwoPossession;
  let thisGamesAwayTeamShotsOnGoal = thisGamesResult[0].TeamTwoShotsOnGoal;
  let thisGamesAwayTeamPasses = thisGamesResult[0].TeamTwoPasses;
  let thisGamesAwayTeamKicks = thisGamesResult[0].TeamTwoKicks;
  // end away team

  let gameCategories = [
    "Team",
    "Score",
    "Possession",
    "SOG",
    "Passes",
    "Kicks",
  ];
  let thisGamesHomeTeamStats = [
    thisGamesHomeTeam,
    thisGamesHomeTeamScore,
    thisGamesHomeTeamPossession,
    thisGamesHomeTeamShotsOnGoal,
    thisGamesHomeTeamPasses,
    thisGamesHomeTeamKicks,
  ];
  let thisGamesAwayTeamStats = [
    thisGamesAwayTeam,
    thisGamesAwayTeamScore,
    thisGamesAwayTeamPossession,
    thisGamesAwayTeamShotsOnGoal,
    thisGamesAwayTeamPasses,
    thisGamesAwayTeamKicks,
  ];
  // boxscore div container
  // team logos

  displayTeamLogos += `<div class=" w3-section boxscoreTeamLogosContainer">`;
  displayTeamLogos += `<div class=" w3-blue w3-round-large w3-card-4 w3-padding-small boxscoreHomeTeamLogo">`;
  displayTeamLogos += `<img src="${thisGamesHomeTeamLogo}">`;
  displayTeamLogos += `</div>`;
  displayTeamLogos += `<div class="w3-blue w3-round-large w3-card-4 w3-padding-small boxscoreAwayTeamLogo">`;
  displayTeamLogos += `<img src="${thisGamesAwayTeamLogo}">`;
  displayTeamLogos += `</div>`;
  displayTeamLogos += `</div>`;

  // end team logos
  // begin player stats data

  let thisGamesPlayerStats = gamePlayerStats.filter(
    (item) => item.GameID == gameNumber
  );
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
  //TESTING
  let thisGamesPlayerStatMAPS = [];
  for (let i = 0; i < thisGamesPlayerStats.length; i++) {
    thisGamesPlayerStatMAPS.push(
      new Map(Object.entries(thisGamesPlayerStats[i]))
    );
    thisGamesPlayerStatMAPS[i].set(
      "Points",
      +thisGamesPlayerStatMAPS[i].get("Goals") +
        +thisGamesPlayerStatMAPS[i].get("Assists")
    );
  }
  // END TESTING
  // begin data containers
  for (let i = 0; i < gameCategories.length; i++) {
    displayGameData += `<div class="boxscoreContainer w3-center">`;
    // set first rows home teams cell to teams main color
    if (i == 0) {
      displayGameData += `<div class="boxscoreHomeStats" style="background-color:${thisGamesHomeTeamColor}">`;
    } else {
      displayGameData += `<div class="boxscoreHomeStats">`;
    }
    // onto next rows
    displayGameData += `${thisGamesHomeTeamStats[i]}`;
    displayGameData += `</div>`;

    displayGameData += `<div class="boxscoreSeperator">`;
    displayGameData += `${gameCategories[i]}`;

    displayGameData += `</div>`;

    // set first rows home teams cell to teams main color
    if (i == 0) {
      displayGameData += `<div class="boxscoreAwayStats" style="background-color:${thisGamesAwayTeamColor}">`;
    } else {
      displayGameData += `<div class="boxscoreAwayStats">`;
    }
    // onto next rows
    displayGameData += `${thisGamesAwayTeamStats[i]}`;
    displayGameData += `</div>`;
    // end boxscore container div
    displayGameData += `</div>`;
  }

  displayGameData += `<br>`;
  displayGameData += `<h4>Table currently ordered by points but not sortable at the moment</h4>`;
  displayGameData += `<br>`;
  // begin players game stats table
  displayGameData += `<table id="boxscorePlayerStats">`;
  // html table caption
  // displayGameData += `<caption><h3>Player Stats</h3></caption>`;
  // html table thead
  (function setPlayersBoxscoreTable(sortBy = "Points") {
    sortGroupedStats(thisGamesPlayerStatMAPS, sortBy);
    displayGameData += "<thead><tr>";
    for (let i = 0; i < fieldsLength; i++) {
      if (playersTable[i] == sortBy) {
        displayGameData +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          ` class="w3-orange">` +
          playersTable[i] +
          "</th>";
      } else {
        displayGameData +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          " >" +
          playersTable[i] +
          "</th>";
      }
    }
    displayGameData += "</tr></thead>";
    // end of html table header fields row
    thisGamesPlayerStatMAPS.forEach((item) => {
      // table data begins for each field
      displayGameData += "<tr>";

      for (let j = 0; j < fieldsLength; j++) {
        if (playersTable[j] == sortBy) {
          displayGameData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            ` class="w3-yellow">` + // add yellow background for sorted column points
            item.get(playersTable[j]) +
            "</td>";
        } else if (playersTable[j] == "Name") {
          displayGameData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            " >" +
            playersMAP.get(+item.get("PlayerID")) +
            "</td>";
        } else {
          displayGameData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            " >" +
            item.get(playersTable[j]) +
            "</td>";
        }
      }

      displayGameData += "</tr>";
    });
  })();
  // end players game stats table
  displayGameData += `</table>`;
  //end data containers
  tablesDiv.innerHTML = displayTeamLogos;
  scoreboardDiv.innerHTML = displayGameData;
}

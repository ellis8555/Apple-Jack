
  import { GameResults, GamePlayerStats, TeamPlayers } from "../../constants/masterHaxData.js";
  import teamsMAP from "../var_lib/maps/teams/teamsMAP.js";
  import playersMAP from "../var_lib/maps/players/playersMAP.js";
  import teamsNumMAP from "../var_lib/maps/teams/teamsNumMAP.js";
  import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP.js";
  import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import clearTablesDiv from "../tables/clearTablesDiv.js";
  import getScoreboardDiv from "../scoreboard/getScoreboardDiv.js";
  import getTablesDiv from "../tables/getTablesDiv.js";
  import sortGroupedStats from "../misc/sort.js";
  import getTeamsGameResults from "./getTeamsGamesResults.js";
  import teamsColorMAP from "../var_lib/maps/teams/teamsColorMAP.js";
  import getTeams3dColorScheme from "../misc/getTeams3DColorScheme.js";
  import { HC_FONT } from "../../constants/consts/vars.js";
  
  export default function setGamesData(e) {
    clearScoreboardDiv();
    clearTablesDiv();
    getScoreboardDiv();
    getTablesDiv();
    const teamLogosHcSize = HC_FONT.singleGameStats
    let displayGameData = "";
    let displayTeamLogos = "";
    let gameNumber = e.target.dataset.gameId;
    let teamName = e.target.dataset.teamName;
    let gameType = e.target.dataset.gameType;
    let thisSeasonNumber = GameResults.filter(
      (item) => item.GameID == gameNumber
    )[0].SeasonNumber;
    let thisGamesResult = GameResults.filter((item) => item.GameID == gameNumber);
    // begin home team
    let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
    let thisGamesHomeTeamColor = `#${
      eachTeamObjectMAP.get(thisGamesHomeTeam).MainColor
    }`;
    let thisGamesHomeTeamLogo =
      eachTeamObjectMAP.get(thisGamesHomeTeam)[
        `S0${thisSeasonNumber}HomeFilePath`
      ];
    //***************************** */
  
    let thisGamesHomeTeamsPlayerRecords = TeamPlayers.filter(
      (item) =>
        item.SeasonNumber == thisSeasonNumber &&
        item.TeamID == String(teamsNumMAP.get(thisGamesHomeTeam))
    );
    let thisGamesHomeTeamPlayerNames = [];
    thisGamesHomeTeamsPlayerRecords.forEach((item) =>
      thisGamesHomeTeamPlayerNames.push(playersMAP.get(+item.PlayerID))
    );
  
    //**************************************** */
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
    //***************************** */
    let thisGamesAwayTeamsPlayerRecords = TeamPlayers.filter(
      (item) =>
        item.SeasonNumber == thisSeasonNumber &&
        item.TeamID == String(teamsNumMAP.get(thisGamesAwayTeam))
    );
    let thisGamesAwayTeamPlayerNames = [];
    thisGamesAwayTeamsPlayerRecords.forEach((item) =>
      thisGamesAwayTeamPlayerNames.push(playersMAP.get(+item.PlayerID))
    );
    //***************************************** */
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
    // back button area which is row above team logos
    displayTeamLogos += `<button id="gamesBoxscoreBackButton" class="w3-btn w3-round-large boxscoreBackButton" style="background-color:#${
      eachTeamObjectMAP.get(teamName).MainColor
    }; color: #ffffff;" data-team-name="${teamName}" data-season-num="${thisSeasonNumber}" data-game-type="${gameType}">back</button>`;
    // home team logo
    let homeColorString = `S0${thisSeasonNumber}Home`
    let teamsColorScheme = eachTeamObjectMAP.get(thisGamesHomeTeam)[homeColorString]
    let colorParts = teamsColorScheme.split(" ")
    let mainColor = colorParts[2];
    displayTeamLogos += `<div class=" w3-blue w3-round-large w3-card-4 w3-padding-small boxscoreHomeTeamLogo">`;
    displayTeamLogos += `<div
        data-team-name="${thisGamesHomeTeam}" 
        data-season-num="${thisSeasonNumber}"
        class="navLogo three-d-Logo"
        style="width: 8rem; height: 6rem; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          thisGamesHomeTeam
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`;
    displayTeamLogos += `</div>`;
    // away team logo
    let awayColorString = `S0${thisSeasonNumber}Away`
    let awayTeamsColorScheme = eachTeamObjectMAP.get(thisGamesAwayTeam)[awayColorString]
    colorParts = awayTeamsColorScheme.split(" ")
    mainColor = colorParts[2];
    displayTeamLogos += `<div class="w3-blue w3-round-large w3-card-4 w3-padding-small boxscoreAwayTeamLogo">`;
    displayTeamLogos += `<div
        data-team-name="${thisGamesAwayTeam}" 
        data-season-num="${thisSeasonNumber}"
        class="navLogo three-d-Logo"
        style="width: 8rem; height: 6rem; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          thisGamesAwayTeam
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`;
    displayTeamLogos += `</div>`;
    displayTeamLogos += `</div>`;
    // display team logos
    tablesDiv.innerHTML = displayTeamLogos;
    // end team logos
  
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
  
    displayGameData += `<br>`;
  
    // div holding the players table
    displayGameData += `<div id="boxscorePlayerStats"></div>`;
  
    // display team stats below team logos
    scoreboardDiv.innerHTML = displayGameData;
  
    // listener for the back button back to teams layout Page
    document
      .getElementById("gamesBoxscoreBackButton")
      .addEventListener("click", getTeamsGameResults);
    // end back button
    // begin player stats data
    let thisGamesPlayerStats = GamePlayerStats.filter(
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
    function setPlayersBoxscoreTable(e) {
      let sortBy;
      if (e) {
        sortBy = e.target.dataset.fieldName;
      } else {
        sortBy = "Points";
      }
      sortGroupedStats(thisGamesPlayerStatMAPS, sortBy);
      let playerStatsContainer = document.querySelector("#boxscorePlayerStats");
      let playersData = "";
      // begin players game stats table
      playersData += `<table>`;
      // html table thead
      playersData += "<thead><tr>";
      for (let i = 0; i < fieldsLength; i++) {
        if (playersTable[i] == sortBy) {
          playersData +=
            `<th data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[i] +
            ` class="w3-orange">` +
            playersTable[i] +
            "</th>";
        } else {
          playersData +=
            `<th data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[i] +
            " >" +
            playersTable[i] +
            "</th>";
        }
      }
      playersData += "</tr></thead>";
      // end of html table header fields row
      thisGamesPlayerStatMAPS.forEach((item) => {
        // table data begins for each field
        playersData += "<tr>";
        for (let j = 0; j < fieldsLength; j++) {
          if (playersTable[j] == sortBy) {
            playersData +=
              `<td data-field-name=` + //data-fieldNames required for mobile layout
              playersTable[j] +
              ` class="w3-yellow">` + // add yellow background for sorted column points
              item.get(playersTable[j]) +
              "</td>";
          } else if (playersTable[j] == "Name") {
            if (
              thisGamesHomeTeamPlayerNames.includes(
                playersMAP.get(+item.get("PlayerID"))
              )
            ) {
              playersData +=
                `<td data-field-name=` + //data-fieldNames required for mobile layout
                playersTable[j] +
                ` style="background-color:${thisGamesHomeTeamColor};color:#fff">` +
                playersMAP.get(+item.get("PlayerID")) +
                "</td>";
            } else {
              playersData +=
                `<td data-field-name=` + //data-fieldNames required for mobile layout
                playersTable[j] +
                ` style="background-color:${thisGamesAwayTeamColor};color:#fff">` +
                playersMAP.get(+item.get("PlayerID")) +
                "</td>";
            }
          } else {
            playersData +=
              `<td data-field-name=` + //data-fieldNames required for mobile layout
              playersTable[j] +
              " >" +
              item.get(playersTable[j]) +
              "</td>";
          }
        }
  
        playersData += "</tr>";
      });
      playersData += `</table>`;
      playerStatsContainer.innerHTML = playersData;
      let browserWidth = window.innerWidth;
      if (browserWidth < 982) {
        let mobileTableCells = document.querySelectorAll(
          "#boxscorePlayerStats td"
        );
        let eachCell = Array.from(mobileTableCells);
        eachCell.forEach((field) =>
          field.addEventListener("click", setPlayersBoxscoreTable)
        );
      } else {
        let getFieldNames = document.querySelectorAll("#boxscorePlayerStats th");
        let headers = Array.from(getFieldNames);
        headers.forEach((field) =>
          field.addEventListener("click", setPlayersBoxscoreTable)
        );
      }
    }
    setPlayersBoxscoreTable();
    // end players game stats table
  }
  
  //end data containers
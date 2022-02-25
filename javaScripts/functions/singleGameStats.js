import {
  gameResults,
  gifs,
  teamsMAP,
  eachTeamObjectMAP,
} from "../../json/masterVars.js";
import {
  clearScoreboardDiv,
  clearTablesDiv,
  getScoreboardDiv,
  getTablesDiv,
} from "./variousFunctions.js";

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
  displayGameData += `<div class="boxscoreContainer">`;
  // begin data containers

  for (let i = 0; i < gameCategories.length; i++) {
    displayGameData += `<div class="boxscoreHomeStats">`;
    displayGameData += `${thisGamesHomeTeamStats[i]}`;
    displayGameData += `</div>`;

    displayGameData += `<div class="boxscoreSeperator">`;
    displayGameData += `${gameCategories[i]}`;

    displayGameData += `</div>`;

    displayGameData += `<div class="boxscoreAwayStats">`;
    displayGameData += `${thisGamesAwayTeamStats[i]}`;
    displayGameData += `</div>`;
  }

  //end data containers
  // end boxscore container div
  displayGameData += `</div>`;
  // team logos
  displayTeamLogos += `<div class="boxscoreTeamLogosContainer">`;
  displayTeamLogos += `<div class="boxscoreHomeTeamLogo">`;
  displayTeamLogos += `<img src="${thisGamesHomeTeamLogo}">`;
  displayTeamLogos += `</div>`;
  displayTeamLogos += `<div class="boxscoreAwayTeamLogo">`;
  displayTeamLogos += `<img src="${thisGamesAwayTeamLogo}">`;
  displayTeamLogos += `</div>`;
  displayTeamLogos += `</div>`;

  tablesDiv.innerHTML = displayTeamLogos;
  scoreboardDiv.innerHTML = displayGameData;
}

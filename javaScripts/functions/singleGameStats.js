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
} from "./variousFunctions.js";

export default function setGamesData(e) {
  clearScoreboardDiv();
  clearTablesDiv();
  getScoreboardDiv();
  let displayGameData = "";
  let gameNumber = e.target.dataset.gameId;
  let thisSeasonNumber = gameResults.filter(
    (item) => item.GameID == gameNumber
  )[0].SeasonNumber;
  let thisGamesResult = gameResults.filter((item) => item.GameID == gameNumber);
  let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
  let thisGamesHomeTeamLogo =
    eachTeamObjectMAP.get(thisGamesHomeTeam)[
      `S0${thisSeasonNumber}HomeFilePath`
    ];
  let thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
  let thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
  let thisGamesAwayTeamLogo =
    eachTeamObjectMAP.get(thisGamesAwayTeam)[
      `S0${thisSeasonNumber}HomeFilePath`
    ];
  let thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
  let thisGamesHighlights = gifs.filter((item) => item.GameID == gameNumber);
  if (thisGamesHighlights.length > 0) {
    // boxscore div container
    displayGameData += `<div class="boxscoreContainer">`;
    // begin data containers
    displayGameData += `<div class="boxscoreHomeTeamLogo">`;
    displayGameData += `<img src="${thisGamesHomeTeamLogo}">`;
    displayGameData += `</div>`;
    displayGameData += `<div class="boxscoreHomeTeamStats">`;
    displayGameData += `${thisGamesHomeTeamScore}`;
    displayGameData += `</div>`;
    displayGameData += `<div class="boxscoreSeperator">`;
    displayGameData += ` : `;
    displayGameData += `</div>`;
    displayGameData += `<div class="boxscoreAwayStats">`;
    displayGameData += `${thisGamesAwayTeamScore}`;
    displayGameData += `</div>`;
    displayGameData += `<div class="boxscoreAwayLogo">`;
    displayGameData += `<img src="${thisGamesAwayTeamLogo}">`;
    displayGameData += `</div>`;
    //end data containers
    // end boxscore container div
    displayGameData += `</div>`;
    scoreboardDiv.innerHTML = displayGameData;
  } else {
    displayGameData = "<h3>No highlights for this game</h3>";
    scoreboardDiv.innerHTML = displayGameData;
  }
}

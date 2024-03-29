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
import { getTeamsGameResults } from "../setData/setTables/teamsTables.js";

export default function setGifs(e) {
  clearScoreboardDiv();
  clearTablesDiv();
  getTablesDiv();
  getScoreboardDiv();
  let displayGifsHeader = "";
  let displayGifs = "";
  let gameNumber = e.target.dataset.gameId;
  let teamName = e.target.dataset.teamName;
  let teamLogo = e.target.dataset.teamLogo;
  let gameType = e.target.dataset.gameType;
  let thisGamesResult = gameResults.filter((item) => item.GameID == gameNumber);
  let thisGifsSeasonNum = thisGamesResult[0].SeasonNumber;
  let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
  let thisGamesHomeTeamLogo =
    eachTeamObjectMAP.get(thisGamesHomeTeam)[
      `S0${thisGifsSeasonNum}HomeFilePath`
    ];
  let thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
  let thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
  let thisGamesAwayTeamLogo =
    eachTeamObjectMAP.get(thisGamesAwayTeam)[
      `S0${thisGifsSeasonNum}HomeFilePath`
    ];
  let thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
  let thisGamesHighlights = gifs.filter((item) => item.GameID == gameNumber);
  if (thisGamesHighlights.length > 0) {
    // begin title for gifs page
    displayGifsHeader = `<div class="gifsHeaderContainer">`;
    // back button
    displayGifsHeader += `<button id="gamesGifsBackButton" class="w3-btn w3-round-large gifsBackButton" style="background-color:#${
      eachTeamObjectMAP.get(teamName).MainColor
    }; color: #ffffff;" data-team-name="${teamName}" data-team-logo="${teamLogo}" data-season-num="${thisGifsSeasonNum}" data-game-type="${gameType}">back</button>`;
    // end back button
    displayGifsHeader += `<div class="gifsHomeTeam">`;
    displayGifsHeader += `<img src="${thisGamesHomeTeamLogo}">`;
    displayGifsHeader += `</div>`;
    displayGifsHeader += `<div class="gifsHomeTeamScore">`;
    displayGifsHeader += thisGamesHomeTeamScore;
    displayGifsHeader += `</div>`;
    displayGifsHeader += `<div class="gifsVsHeader">`;
    displayGifsHeader += ` vs `;
    displayGifsHeader += `</div>`;
    displayGifsHeader += `<div class="gifsAwayTeam">`;
    displayGifsHeader += `<img src="${thisGamesAwayTeamLogo}">`;
    displayGifsHeader += `</div>`;
    displayGifsHeader += `<div class="gifsAwayTeamScore">`;
    displayGifsHeader += thisGamesAwayTeamScore;
    displayGifsHeader += `</div>`;
    //end div for header container
    displayGifsHeader += `</div>`;
    //end of gifs page title
    tablesDiv.innerHTML = displayGifsHeader;

    // listener for the back button back to teams layout Page
    document
      .getElementById("gamesGifsBackButton")
      .addEventListener("click", getTeamsGameResults);
    // end back button

    for (let i = 0; i < thisGamesHighlights.length; i++) {
      let thisGamesFinalPath;
      let theseGifsSubSet = thisGamesHighlights[0].Filepath;
      let thisGifsSubPath = theseGifsSubSet.slice(
        0,
        theseGifsSubSet.length - 6
      );
      if (i < 9) {
        thisGamesFinalPath = `${thisGifsSubPath}0${i + 1}.gif`;
      } else {
        thisGamesFinalPath = `${thisGifsSubPath}${i + 1}.gif`;
      }
      let thisGif = thisGamesHighlights.find(
        (item) => item.Filepath == thisGamesFinalPath
      );
      displayGifs += `<h5>${thisGif.Comment}</h5>`;
      displayGifs += `<img src="${thisGamesFinalPath}">`;
    }
    scoreboardDiv.innerHTML = displayGifs;
  } else {
    let noGifs = "<h3>No highlights for this game</h3>";
    scoreboardDiv.innerHTML = noGifs;
  }
}

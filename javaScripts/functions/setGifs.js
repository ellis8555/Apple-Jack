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

export default function setGifs(e) {
  clearScoreboardDiv();
  clearTablesDiv();
  getTablesDiv();
  getScoreboardDiv();
  let displayGifsHeader = "";
  let displayGifs = "";
  let gameNumber = e.target.dataset.gameId;
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
      let thisGif = thisGamesHighlights.filter(
        (item) => thisGamesFinalPath == item.Filepath
      );
      displayGifs += `<h5>${thisGif[0].Comment}</h5>`;
      displayGifs += `<img src="${thisGamesFinalPath}">`;
    }
    scoreboardDiv.innerHTML = displayGifs;
  } else {
    let noGifs = "<h3>No highlights for this game</h3>";
    scoreboardDiv.innerHTML = noGifs;
  }
}

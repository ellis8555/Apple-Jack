import { gameResults, gifs, teamsMAP } from "../../json/masterVars.js";
import {
  clearScoreboardDiv,
  clearTablesDiv,
  getScoreboardDiv,
} from "./variousFunctions.js";

export default function setGifs(e) {
  clearScoreboardDiv();
  clearTablesDiv();
  getScoreboardDiv();
  let displayGifs = "";
  let gameNumber = e.target.dataset.gameId;
  let thisGamesResult = gameResults.filter((item) => item.GameID == gameNumber);
  let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
  let thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
  let thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
  let thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
  let thisGamesHighlights = gifs.filter((item) => item.GameID == gameNumber);
  if (thisGamesHighlights.length > 0) {
    displayGifs = `<h3>${thisGamesHomeTeam} ${thisGamesHomeTeamScore}</h3>
    vs 
    <h3>${thisGamesAwayTeam} ${thisGamesAwayTeamScore}</h3>`;
    thisGamesHighlights.forEach((item) => {
      displayGifs += `<img src="${item.Filepath}">`;
      scoreboardDiv.innerHTML = displayGifs;
    });
  } else {
    displayGifs = "<h3>No highlights for this game</h3>";
    scoreboardDiv.innerHTML = displayGifs;
  }
}

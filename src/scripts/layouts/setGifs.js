  import { GameResults, Gifs } from "../../constants/masterHaxData.js";
  import teamsMAP from "../var_lib/maps/teams/teamsMAP.js";
  import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP.js";
  import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import clearTablesDiv from "../tables/clearTablesDiv.js";
  import getScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import getTablesDiv from "../tables/getTablesDiv.js";
  import getTeamsGameResults from "./getTeamsGamesResults.js";
  import createTeamCssLogo from "../misc/createTeamCssLogo.js";
  
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
    let thisGamesResult = GameResults.filter((item) => item.GameID == gameNumber);
    let thisGifsSeasonNum = thisGamesResult[0].SeasonNumber;
    let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
    let thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
    let thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
    let thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
    let thisGamesHighlights = Gifs.filter((item) => item.GameID == gameNumber);
    if (thisGamesHighlights.length > 0) {
      // begin title for gifs page
      displayGifsHeader = `<div class="gifsHeaderContainer">`;
      // back button
      displayGifsHeader += `<button id="gamesGifsBackButton" class="w3-btn w3-round-large gifsBackButton" style="background-color:#${
        eachTeamObjectMAP.get(teamName).MainColor
      }; color: #ffffff;" data-team-name="${teamName}" data-team-logo="${teamLogo}" data-season-num="${thisGifsSeasonNum}" data-game-type="${gameType}">back</button>`;
      // end back button
      // home team logo
      displayGifsHeader += `<div class="gifsHomeTeam">`;
      displayGifsHeader += createTeamCssLogo.setGifs(thisGamesHomeTeam, thisGifsSeasonNum, "Home");
      displayGifsHeader += `</div>`;
      displayGifsHeader += `<div class="gifsHomeTeamScore">`;
      displayGifsHeader += thisGamesHomeTeamScore;
      displayGifsHeader += `</div>`;
      displayGifsHeader += `<div class="gifsVsHeader">`;
      displayGifsHeader += ` vs `;
      displayGifsHeader += `</div>`;
      // away team logo
      displayGifsHeader += `<div class="gifsAwayTeam">`;
      displayGifsHeader += createTeamCssLogo.setGifs(thisGamesAwayTeam, thisGifsSeasonNum, "Away");
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
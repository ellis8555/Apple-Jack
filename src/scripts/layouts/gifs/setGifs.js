  import { GameResults, Gifs } from "../../../constants/masterHaxData.js";
  import teamsMAP from "../../var_lib/maps/teams/teamsMAP.js";
  import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv.js";
  import clearTablesDiv from "../../tables/clearTablesDiv.js";
  import getScoreboardDiv from "../../scoreboard/getScoreboardDiv.js";
  import getTablesDiv from "../../tables/getTablesDiv.js";
  import getTeamsGameResults from "../getTeamsGamesResults/getTeamsGamesResults.js";
  import observeGifs from "./helpers/observeGifs.js"
  import gifsHeader from "./components/gifsHeader.js";
  import setGifContainers from "./components/setGifContainers.js"
  import noGifs from "./components/noGifs.js";
  
  export default function setGifs(e) {
    clearScoreboardDiv();
    clearTablesDiv();
    const tablesDiv = getTablesDiv();
    const scoreboardDiv = getScoreboardDiv();
    const gameNumber = e.target.dataset.gameId;
    const teamName = e.target.dataset.teamName;
    const gameType = e.target.dataset.gameType;
    const thisGamesResult = GameResults.filter((item) => item.GameID == gameNumber);
    const thisGifsSeasonNum = thisGamesResult[0].SeasonNumber;
    const thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
    const thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
    const thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
    const thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
    const thisGamesHighlights = Gifs.filter((item) => item.GameID == gameNumber);

    // arguments for methods used below
    const argsObject = {
      teamName, thisGifsSeasonNum,  thisGamesHomeTeam, thisGamesAwayTeam ,thisGamesHomeTeamScore, thisGamesAwayTeamScore, thisGamesHighlights
    }

    if (thisGamesHighlights.length > 0) {
  
      // Set the gifs header
      tablesDiv.innerHTML = "";
      tablesDiv.appendChild(gifsHeader(argsObject));

          // scroll window to the top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      } );
    }, 100)
  
      // listener for the back button back to teams layout Page
      document
        .getElementById("gamesGifsBackButton")
        .addEventListener("click", getTeamsGameResults);
      // end back button
      // Append the gifs to the scoreboardDiv
      scoreboardDiv.appendChild(setGifContainers(argsObject));

      // watch gif containers for lazy loading
      observeGifs()

    } else {
      scoreboardDiv.appendChild(noGifs());
    }
  }
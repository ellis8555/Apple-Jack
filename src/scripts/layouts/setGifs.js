  import { GameResults, Gifs } from "../../constants/masterHaxData.js";
  import teamsMAP from "../var_lib/maps/teams/teamsMAP.js";
  import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP.js";
  import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import clearTablesDiv from "../tables/clearTablesDiv.js";
  import getScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import getTablesDiv from "../tables/getTablesDiv.js";
  import getTeamsGameResults from "./getTeamsGamesResults.js";
  import createTeamCssLogo from "../misc/createTeamCssLogo.js";
  import backButton from "../misc/backButton.js";
  
  export default function setGifs(e) {
    clearScoreboardDiv();
    clearTablesDiv();
    getTablesDiv();
    getScoreboardDiv();
    let displayGifs = "";
    let gameNumber = e.target.dataset.gameId;
    let teamName = e.target.dataset.teamName;
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
      const gifsHeaderContainer = document.createElement("div");
      gifsHeaderContainer.classList.add("gifsHeaderContainer");
  
      // Back button
      const backButtonElement = backButton(
        "gamesGifsBackButton",
        teamName,
        thisGifsSeasonNum,
        "Season",
        "gifsBackButton"
      );
      gifsHeaderContainer.appendChild(backButtonElement);
  
      // Home team section
      const gifsHomeTeam = document.createElement("div");
      gifsHomeTeam.classList.add("gifsHomeTeam");
      gifsHomeTeam.innerHTML = createTeamCssLogo.setGifs(
        thisGamesHomeTeam,
        thisGifsSeasonNum,
        "Home"
      );
      gifsHeaderContainer.appendChild(gifsHomeTeam);
  
      const gifsHomeTeamScore = document.createElement("div");
      gifsHomeTeamScore.classList.add("gifsHomeTeamScore");
      gifsHomeTeamScore.textContent = thisGamesHomeTeamScore;
      gifsHeaderContainer.appendChild(gifsHomeTeamScore);
  
      // "vs" section
      const gifsVsHeader = document.createElement("div");
      gifsVsHeader.classList.add("gifsVsHeader");
      gifsVsHeader.textContent = " vs ";
      gifsHeaderContainer.appendChild(gifsVsHeader);
  
      // Away team section
      const gifsAwayTeam = document.createElement("div");
      gifsAwayTeam.classList.add("gifsAwayTeam");
      gifsAwayTeam.innerHTML = createTeamCssLogo.setGifs(
        thisGamesAwayTeam,
        thisGifsSeasonNum,
        "Away"
      );
      gifsHeaderContainer.appendChild(gifsAwayTeam);
  
      const gifsAwayTeamScore = document.createElement("div");
      gifsAwayTeamScore.classList.add("gifsAwayTeamScore");
      gifsAwayTeamScore.textContent = thisGamesAwayTeamScore;
      gifsHeaderContainer.appendChild(gifsAwayTeamScore);
  
      // Set the gifs header
      tablesDiv.innerHTML = "";
      tablesDiv.appendChild(gifsHeaderContainer);
  
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
              // Create a container for each GIF and comment
      const gifContainer = document.createElement("div");
      gifContainer.classList.add("gifContainer");

      // Add the comment
      const gifComment = document.createElement("h5");
      gifComment.textContent = thisGif.Comment;
      gifContainer.appendChild(gifComment);

      // Add the GIF image
      const gifImage = document.createElement("img");
      gifImage.src = thisGamesFinalPath;
      gifContainer.appendChild(gifImage);

      // Append the container to the scoreboardDiv
      scoreboardDiv.appendChild(gifContainer);
      }
    } else {
      const noGifsMessage = document.createElement("h3");
      noGifsMessage.textContent = "No highlights for this game";
      scoreboardDiv.appendChild(noGifsMessage);
    }
  }
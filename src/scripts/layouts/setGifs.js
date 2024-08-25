  import { GameResults, Gifs } from "../../constants/masterHaxData.js";
  import teamsMAP from "../var_lib/maps/teams/teamsMAP.js";
  import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP.js";
  import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import clearTablesDiv from "../tables/clearTablesDiv.js";
  import getScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";
  import getTablesDiv from "../tables/getTablesDiv.js";
  import getTeamsGameResults from "./getTeamsGamesResults.js";
  import teamsColorMAP from "../var_lib/maps/teams/teamsColorMAP.js";
  
  export default function setGifs(e) {
    clearScoreboardDiv();
    clearTablesDiv();
    getTablesDiv();
    getScoreboardDiv();
    const teamLogosHcSize = '1rem, 2.5rem, 2.75rem'
    let displayGifsHeader = "";
    let displayGifs = "";
    let gameNumber = e.target.dataset.gameId;
    let teamName = e.target.dataset.teamName;
    let teamLogo = e.target.dataset.teamLogo;
    let gameType = e.target.dataset.gameType;
    let thisGamesResult = GameResults.filter((item) => item.GameID == gameNumber);
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
      let homeColorString = `S0${thisGifsSeasonNum}Home`
      let teamsColorScheme = eachTeamObjectMAP.get(thisGamesHomeTeam)[homeColorString]
      let colorParts = teamsColorScheme.split(" ")
      let mainColor = colorParts[2];
      displayGifsHeader += `<div class="gifsHomeTeam">`;
      displayGifsHeader += `<div
        data-team-name="${thisGamesHomeTeam}" 
        data-season-num="${thisGifsSeasonNum}"
        class="navLogo three-d-Logo"
        style="width: 7.5rem; height: 6rem; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
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
      displayGifsHeader += `</div>`;
      displayGifsHeader += `<div class="gifsHomeTeamScore">`;
      displayGifsHeader += thisGamesHomeTeamScore;
      displayGifsHeader += `</div>`;
      displayGifsHeader += `<div class="gifsVsHeader">`;
      displayGifsHeader += ` vs `;
      displayGifsHeader += `</div>`;
      // away team logo
      let awayColorString = `S0${thisGifsSeasonNum}Away`
      let awayTeamsColorScheme = eachTeamObjectMAP.get(thisGamesAwayTeam)[awayColorString]
      colorParts = awayTeamsColorScheme.split(" ")
      mainColor = colorParts[2];
      displayGifsHeader += `<div class="gifsAwayTeam">`;
      displayGifsHeader += `<div
        data-team-name="${thisGamesAwayTeam}" 
        data-season-num="${thisGifsSeasonNum}"
        class="navLogo three-d-Logo"
        style="width: 7.5rem; height: 6rem; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
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

  function getTeams3dColorScheme(mainColor, colorParts){
    let teams3dColorScheme;
    const colorPartsLength = colorParts.length;
    switch(colorPartsLength){
        case 3:
            teams3dColorScheme = `#${colorParts[2]}`
            return teams3dColorScheme
        case 4:
            teams3dColorScheme = `linear-gradient(to right, #${colorParts[2]} 50%, #${colorParts[3]} 51%)`
            return teams3dColorScheme
        case 5:
            teams3dColorScheme = `linear-gradient(to right, #${colorParts[2]} 35%, #${colorParts[3]} 36% 64%, #${colorParts[4]} 65%)`
            return teams3dColorScheme
            default:
            return `#${mainColor}`
    }
}
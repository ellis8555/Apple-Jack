import TeamStats from "../classFiles/teamStats";
import teamsMAP from "../var_lib/maps/teams/teamsMAP";
import setHeaderBanner from "./setHeaderBanner";
import clearTablesDiv from "../tables/clearTablesDiv";
import teamsColorMAP from "../var_lib/maps/teams/teamsColorMAP";
import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";
import setTeamsPageLayout from "./setTeamsPageLayout";
import setGifs from "./setGifs"
import setGamesData from "./singleGameStats"
import getTeams3dColorScheme from "../misc/getTeams3DColorScheme"
import { Teams, Gifs } from "../../constants/masterHaxData";
import { HC_FONT } from "../../constants/consts/vars";

export default function getTeamsGameResults(e) {
    let team = e.target.dataset.teamName;
    let seasonNum = e.target.dataset.seasonNum;
    let gameType = e.target.dataset.gameType; // 1="Season" 2="Playoff"

    const teamLogosHcSize = HC_FONT.getTeamsGamesResults;
  
    let teamsGames;
    let thisGamesGifs;
    let gameResults = "";
    let gameResultsBoxResult = "";
    let win = "W";
    let loss = "L";
    let draw = "D";
    let overTimeWin = "OTW";
    let overTimeLoss = "OTL";
    teamsGames =
      TeamStats.allTeamStats[team][
        "teamsSeason" + seasonNum + gameType + "Stats"
      ][0];
    let gamesLength = teamsGames.length;
    gameResults = `<button id="gameResultsBackButton" class="w3-btn w3-round-large" style="background-color:#${teamsColorMAP.get(
      team
    )}; color: #ffffff;" data-team-name="${team}" data-season-num="${seasonNum}">back</button>`;
    gameResults += `<h1>${team}</h1>`;
    gameResults += `<h4>S0${seasonNum} ${gameType}</h4>`;
    if (gamesLength > 0) {
      for (let i = 0; i < gamesLength; i++) {
        gameResults += `<div style="display: flex; justify-content: center">`;
        // class gameResults is containing grid
        gameResults += `<div class="w3-container w3-margin gameResults">`;
        // homeTeam logo
        gameResults += `<div class="homeTeamLogo w3-card w3-blue">`;
        if (team == `${teamsMAP.get(+teamsGames[i].TeamOne)}`) {
          let homeColorString = `S0${seasonNum}Home`
          let teamsColorScheme = eachTeamObjectMAP.get(team)[homeColorString]
          let colorParts = teamsColorScheme.split(" ")
          let mainColor = colorParts[2];
          gameResults += `
          <div
        data-team-name="${team}" 
        data-season-num="${seasonNum}"
        class="navLogo three-d-Logo"
        style="width: 85%; height: 85%; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          team
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>
          `;
        } else {
          let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
          let otherTeamsObject = Teams.filter(
            (item) => item.TeamName == otherTeam
          );
          let otherTeamsLogo =
            eachTeamObjectMAP.get(otherTeam)[`S0${seasonNum}HomeFilePath`];
            let awayColorString = `S0${seasonNum}Home`
            let teamsColorScheme = eachTeamObjectMAP.get(otherTeam)[awayColorString]
            let colorParts = teamsColorScheme.split(" ")
            let mainColor = colorParts[2];
          gameResults += `
          <div
        data-team-name="${otherTeam}" 
        data-season-num="${seasonNum}"
        class="navLogo three-d-Logo"
        style="width: 85%; height: 85%; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          otherTeam
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 500;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>
          `;
        }
        gameResults += `</div>`;
        // homeTeam name
        gameResults += `<div class="homeTeam"`;
        if (team == `${teamsMAP.get(+teamsGames[i].TeamOne)}`) {
          gameResults += `style="background-color: #${teamsColorMAP.get(
            team
          )}; color: #ffffff;">`;
        } else {
          let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
          gameResults += `style="background-color: #${teamsColorMAP.get(
            otherTeam
          )}; color: #ffffff;">`;
        }
        gameResults += `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
        gameResults += `</div>`;
        // homeScore
        if (+`${teamsGames[i].TeamOneScore}` > +`${teamsGames[i].TeamTwoScore}`) {
          gameResults += `<div class="homeScore w3-green">`;
        } else if (
          +`${teamsGames[i].TeamOneScore}` == +`${teamsGames[i].TeamTwoScore}`
        ) {
          gameResults += `<div class="homeScore w3-dark-gray">`;
        } else {
          gameResults += `<div class="homeScore w3-red">`;
        }
        gameResults += `${+teamsGames[i].TeamOneScore}`;
        gameResults += `</div>`;
        // awayTeam
        gameResults += `<div class="awayTeam"`;
        if (team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}`) {
          gameResults += `style="background-color: #${teamsColorMAP.get(
            team
          )}; color: #ffffff;">`;
        } else {
          let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
          gameResults += `style="background-color: #${teamsColorMAP.get(
            otherTeam
          )}; color: #ffffff;">`;
        }
        gameResults += ` ${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
        gameResults += `</div>`;
        // awayTeam logo
        gameResults += `<div class="awayTeamLogo w3-card w3-blue">`;
        if (team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}`) {
          let homeColorString = `S0${seasonNum}Away`
          let teamsColorScheme = eachTeamObjectMAP.get(team)[homeColorString]
          let colorParts = teamsColorScheme.split(" ")
          let mainColor = colorParts[2];
          gameResults += `
          <div
        data-team-name="${team}" 
        data-season-num="${seasonNum}"
        class="navLogo three-d-Logo"
        style="width: 85%; height: 85%; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          team
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 500;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>
          `;
        } else {
          let otherTeam = `${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
          let otherTeamsObject = Teams.filter(
            (item) => item.TeamName == otherTeam
          );
          let otherTeamsLogo =
            eachTeamObjectMAP.get(otherTeam)[`S0${seasonNum}HomeFilePath`];
            let awayColorString = `S0${seasonNum}Away`
            let teamsColorScheme = eachTeamObjectMAP.get(otherTeam)[awayColorString]
            let colorParts = teamsColorScheme.split(" ")
            let mainColor = colorParts[2];
          gameResults += `
          <div
        data-team-name="${otherTeam}" 
        data-season-num="${seasonNum}"
        class="navLogo three-d-Logo"
        style="width: 85%; height: 85%; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          otherTeam
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 500;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>
          `;
        }
        gameResults += `</div>`;
        // awayTeam score
        if (+`${teamsGames[i].TeamOneScore}` < +`${teamsGames[i].TeamTwoScore}`) {
          gameResults += `<div class="awayScore w3-green">`;
        } else if (
          +`${teamsGames[i].TeamTwoScore}` == +`${teamsGames[i].TeamOneScore}`
        ) {
          gameResults += `<div class="awayScore w3-dark-gray">`;
        } else {
          gameResults += `<div class="awayScore w3-red">`;
        }
        gameResults += `${+teamsGames[i].TeamTwoScore}`;
        gameResults += `</div>`;
        // gameResult div
        if (team == `${teamsMAP.get(+teamsGames[i].TeamOne)}`) {
          if (
            +`${teamsGames[i].TeamOneScore}` > +`${teamsGames[i].TeamTwoScore}` &&
            `${teamsGames[i].ExtraTime}` == "No"
          ) {
            gameResults += `<div class="gameResultsBox w3-green">`;
            gameResultsBoxResult = win;
          } else if (
            +`${teamsGames[i].TeamOneScore}` > +`${teamsGames[i].TeamTwoScore}` &&
            `${teamsGames[i].ExtraTime}` == "Yes"
          ) {
            gameResults += `<div class="gameResultsBox w3-blue">`;
            gameResultsBoxResult = overTimeWin;
          } else if (
            +`${teamsGames[i].TeamOneScore}` == +`${teamsGames[i].TeamTwoScore}`
          ) {
            gameResults += `<div class="gameResultsBox w3-grey">`;
            gameResultsBoxResult = draw;
          } else if (
            +`${teamsGames[i].TeamOneScore}` < +`${teamsGames[i].TeamTwoScore}` &&
            `${teamsGames[i].ExtraTime}` == "Yes"
          ) {
            gameResults += `<div class="gameResultsBox w3-grey">`;
            gameResultsBoxResult = overTimeLoss;
          } else {
            gameResults += `<div class="gameResultsBox w3-red">`;
            gameResultsBoxResult = loss;
          }
        } else {
          if (team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}`) {
            if (
              +`${teamsGames[i].TeamTwoScore}` >
                +`${teamsGames[i].TeamOneScore}` &&
              `${teamsGames[i].ExtraTime}` == "No"
            ) {
              gameResults += `<div class="gameResultsBox w3-green">`;
              gameResultsBoxResult = win;
            } else if (
              +`${teamsGames[i].TeamTwoScore}` >
                +`${teamsGames[i].TeamOneScore}` &&
              `${teamsGames[i].ExtraTime}` == "Yes"
            ) {
              gameResults += `<div class="gameResultsBox w3-blue">`;
              gameResultsBoxResult = overTimeWin;
            } else if (
              +`${teamsGames[i].TeamTwoScore}` == +`${teamsGames[i].TeamOneScore}`
            ) {
              gameResults += `<div class="gameResultsBox w3-grey">`;
              gameResultsBoxResult = draw;
            } else if (
              +`${teamsGames[i].TeamTwoScore}` <
                +`${teamsGames[i].TeamOneScore}` &&
              `${teamsGames[i].ExtraTime}` == "Yes"
            ) {
              gameResults += `<div class="gameResultsBox w3-grey">`;
              gameResultsBoxResult = overTimeLoss;
            } else {
              gameResults += `<div class="gameResultsBox w3-red">`;
              gameResultsBoxResult = loss;
            }
          }
        }
        gameResults += gameResultsBoxResult;
        gameResults += `</div>`;
        // end gameResult div
        // this games highlight gifs div
        thisGamesGifs = Gifs.filter(
          (gifItem) => gifItem.GameID == teamsGames[i].GameID
        );
        gameResults += `<div data-game-highlights data-team-name="${team}" data-game-id="${teamsGames[i].GameID}" data-game-type="${gameType}"" class="gameHighlights">`;
        gameResults += `Game Highlights (${thisGamesGifs.length})`;
        gameResults += `</div>`;
        // end hightlights gif div
        // this games stats **NOTE data-game-stats="" used to grab element by attribute by CSS
        gameResults += `<div data-game-stats="" data-team-name="${team}" data-game-id="${teamsGames[i].GameID}" data-season-number="${seasonNum}" data-game-type=${gameType}" class="gameStats">`;
        gameResults += `Stats`;
        gameResults += `</div>`;
        // end this games stats
  
        gameResults += `</div>`;
        gameResults += `</div>`;
      }
    } else {
      gameResults += `<h4>No games played</h4>`;
    }
  
    // change header banner when team is selected from navbar
    setHeaderBanner(team, seasonNum);
  
    // change bodies background color to that of team selected
    document.body.style.backgroundColor = `#${teamsColorMAP.get(team)}`;
  
    // display data in correct div and clear previous data
    clearTablesDiv();
    let scores = document.getElementById("scoreboardDiv");
    scores.innerHTML = gameResults;
    // listener for the back button back to teams layout Page
    document
      .getElementById("gameResultsBackButton")
      .addEventListener("click", () => {setTeamsPageLayout(document.getElementById('gameResultsBackButton'))});
    // end back button
    // highlight divs
    let gameHighlightDivs = Array.from(
      document.querySelectorAll("div[data-game-highlights]")
    );
  
    gameHighlightDivs.forEach((item) => item.addEventListener("click", setGifs));
    //end highlights div
    // single games result div
    let gameResultsDataDiv = Array.from(
      document.querySelectorAll("div[data-game-stats]")
    );
    gameResultsDataDiv.forEach((item) =>
      item.addEventListener("click", setGamesData)
    );
    //end single games results div
  }
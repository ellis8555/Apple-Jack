import TeamStats from "../../classFiles/teams/teamStats";
import teamsMAP from "../../var_lib/maps/teams/teamsMAP";
import setHeaderBanner from "../setHeaderBanner";
import clearTablesDiv from "../../tables/clearTablesDiv";
import teamsColorMAP from "../../var_lib/maps/teams/teamsColorMAP";
import setTeamsPageLayout from "../teamsPageLayout/setTeamsPageLayout";
import setGifs from "../gifs/setGifs"
import setGamesData from "../singleGameStats/singleGameStats"
import createTeamCssLogo from "../../misc/createTeamCssLogo";
import backButton from "../../misc/backButton";
import getGameResultClass from "./helpers/getGameResultClass"
import getGameResultText from "./helpers/getGameResultText"
import { Gifs } from "../../../constants/masterHaxData";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv";
import getTablesDiv from "../../tables/getTablesDiv";
import { SEASON_WITH_TEAM_LOGOS_START } from "../../../constants/consts/vars";
import eachTeamObjectMAP from "../../var_lib/maps/teams/eachTeamObjectMAP";

export default function getTeamsGameResults(e) {
    const team = e.target.dataset.teamName;
    const seasonNum = e.target.dataset.seasonNum;
    const gameType = e.target.dataset.gameType; // 1="Season" 2="Playoff"
    let teamsGames;
    teamsGames =
      TeamStats.allTeamStats[team][
        "teamsSeason" + seasonNum + gameType + "Stats"
      ][0];

      const firstRoundGamesCount = teamsGames.filter(game => game.Round === 1).length
      const secondRoundGamesCount = teamsGames.filter(game => game.Round === 2).length
      const thirdRoundGamesCount = teamsGames.filter(game => game.Round === 3).length
      
      const gamesLength = teamsGames.length;
      // seasons where teams now have ai generated team logos
      const seasonNumberAsNumber = parseInt(seasonNum)
      const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNum}` : `S0${seasonNum}`

      const gameResultsFrag = document.createDocumentFragment();

      const backButtonContainer = document.createElement('div');
      backButtonContainer.innerHTML = backButton("gameResultsBackButton", team, seasonNum, gameType).outerHTML
      const backButtonElement = backButtonContainer.firstElementChild;
      gameResultsFrag.append(backButtonElement)

      const teamName = document.createElement('h1');
      teamName.textContent = team;
      gameResultsFrag.append(teamName)

      const scoresSeasonInfo = document.createElement('h4');
      scoresSeasonInfo.textContent = `S0${seasonNum} ${gameType}`;
      gameResultsFrag.append(scoresSeasonInfo)

      // hr line for first round of playoffs
      if(gameType === 'Playoff' && gamesLength > 0 && firstRoundGamesCount > 0){

        // add round line hr
        const roundOneLine = document.createElement('hr')
        roundOneLine.style.border = "none"
        roundOneLine.style.height = "1px"
        roundOneLine.style.backgroundColor = "black"
        gameResultsFrag.append(roundOneLine)

        // add first round text
        const firstRoundText = document.createElement("h5")
        firstRoundText.innerText = "First Round"
        gameResultsFrag.append(firstRoundText)
      }

      // add hr for teams who've had a first round bye
      if(gameType === 'Playoff' && gamesLength > 0 && firstRoundGamesCount === 0 && secondRoundGamesCount > 0){
        // add round line hr
        const roundOneByeLine = document.createElement('hr')
        roundOneByeLine.style.border = "none"
        roundOneByeLine.style.height = "1px"
        roundOneByeLine.style.backgroundColor = "black"
        gameResultsFrag.append(roundOneByeLine)

        // add first round text
        const firstRoundByeText = document.createElement("h5")
        firstRoundByeText.innerText = "First Round Bye"
        gameResultsFrag.append(firstRoundByeText)
      }

      if(gamesLength > 0){
        for (let i = 0; i < gamesLength; i++) {

              // get home and away team names
        let homeTeamName = `${teamsMAP.get(+teamsGames[i].TeamOne)}`
        let awayTeamName = `${teamsMAP.get(+teamsGames[i].TeamTwo)}`
        const gameContainer = document.createElement('div');
        gameContainer.style.display = 'flex';
        gameContainer.style.justifyContent = 'center';

        const gameResultsDiv = document.createElement('div');
        gameResultsDiv.className = 'w3-container w3-margin gameResults';
        gameContainer.appendChild(gameResultsDiv);

        // add hr between first and second round
        if(i === firstRoundGamesCount && secondRoundGamesCount > 0){

        // add round line hr
        const secondLine = document.createElement('hr')
        secondLine.style.border = "none"
        secondLine.style.height = "1px"
        secondLine.style.backgroundColor = "black"
        gameResultsFrag.append(secondLine)

        // add first round text
        const secondRoundText = document.createElement("h5")
        if(thirdRoundGamesCount === 0 && +seasonNum !== 3){
          secondRoundText.innerText = "Championship Round"
        } else {
          secondRoundText.innerText = "2nd Round Robin"
        }
        gameResultsFrag.append(secondRoundText)
        }

        // hr line for playoffs that have 3 rounds
        const firstTwoRoundsGamesTotal = firstRoundGamesCount + secondRoundGamesCount
        if(i === firstTwoRoundsGamesTotal && thirdRoundGamesCount > 0){
          // add round line hr
          const thirdLine = document.createElement('hr')
          thirdLine.style.border = "none"
          thirdLine.style.height = "1px"
          thirdLine.style.backgroundColor = "black"
          gameResultsFrag.append(thirdLine)

          const thirdRoundText = document.createElement("h5")
          thirdRoundText.textContent = "Championship Round"
          gameResultsFrag.append(thirdRoundText)
        }

        // Home Team Logo    
        const homeTeamLogo = document.createElement('div');
        homeTeamLogo.className = 'homeTeamLogo w3-card w3-blue';
        if(seasonNum >= SEASON_WITH_TEAM_LOGOS_START){
          const homeTeamsLogoName = eachTeamObjectMAP.get(homeTeamName)[`${seasonNumberFolderName}HomeFilePath`]
          const homeTeamLogoPath = `../../../../img/teamLogos/${seasonNumberFolderName}/${homeTeamsLogoName}.png`
          const homeTeamLogoImg = document.createElement('img');
          homeTeamLogoImg.src = homeTeamLogoPath
          homeTeamLogoImg.style.height = "3.25rem"
          homeTeamLogoImg.style.width = "3.25rem"
          homeTeamLogo.append(homeTeamLogoImg)
        } else {
          const homeTeamLogoHTML = team == `${teamsMAP.get(+teamsGames[i].TeamOne)}`
              ? createTeamCssLogo.getTeamsGamesResults(team, seasonNum, "Home")
              : createTeamCssLogo.getTeamsGamesResults(`${teamsMAP.get(+teamsGames[i].TeamOne)}`, seasonNum, "Home");
              homeTeamLogo.innerHTML = homeTeamLogoHTML;
        }
        gameResultsDiv.appendChild(homeTeamLogo);

        // Home Team Name
        const homeTeam = document.createElement('div');
        homeTeam.className = 'homeTeam';
        homeTeam.style.backgroundColor = `#${teamsColorMAP.get(team == `${teamsMAP.get(+teamsGames[i].TeamOne)}` ? team : `${teamsMAP.get(+teamsGames[i].TeamOne)}`)}`;
        homeTeam.style.color = '#ffffff';
        homeTeam.textContent = `${teamsMAP.get(+teamsGames[i].TeamOne)}`;
        gameResultsDiv.appendChild(homeTeam);

        // Home Team Score
        const homeScore = document.createElement('div');
        homeScore.className = `homeScore ${teamsGames[i].TeamOneScore > teamsGames[i].TeamTwoScore ? 'w3-green' : teamsGames[i].TeamOneScore == teamsGames[i].TeamTwoScore ? 'w3-dark-gray' : 'w3-red'}`;
        homeScore.textContent = `${teamsGames[i].TeamOneScore}`;
        gameResultsDiv.appendChild(homeScore);

        // Away Team Name
        const awayTeam = document.createElement('div');
        awayTeam.className = 'awayTeam';
        awayTeam.style.backgroundColor = `#${teamsColorMAP.get(team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}` ? team : `${teamsMAP.get(+teamsGames[i].TeamTwo)}`)}`;
        awayTeam.style.color = '#ffffff';
        awayTeam.textContent = `${teamsMAP.get(+teamsGames[i].TeamTwo)}`;
        gameResultsDiv.appendChild(awayTeam);

        // Away Team Logo
        const awayTeamLogo = document.createElement('div');
        awayTeamLogo.className = 'awayTeamLogo w3-card w3-blue';
        if(seasonNum >= SEASON_WITH_TEAM_LOGOS_START) {
          const awayTeamsLogoName = eachTeamObjectMAP.get(awayTeamName)[`${seasonNumberFolderName}HomeFilePath`]
          const awayTeamLogoPath = `../../../../img/teamLogos/${seasonNumberFolderName}/${awayTeamsLogoName}.png`
          const awayTeamLogoImg = document.createElement('img');
          awayTeamLogoImg.src = awayTeamLogoPath
          awayTeamLogoImg.style.height = "3.25rem"
          awayTeamLogoImg.style.width = "3.25rem"
          awayTeamLogo.append(awayTeamLogoImg)
        } else {
          const awayTeamLogoHTML = team == `${teamsMAP.get(+teamsGames[i].TeamTwo)}`
              ? createTeamCssLogo.getTeamsGamesResults(team, seasonNum, "Away")
              : createTeamCssLogo.getTeamsGamesResults(`${teamsMAP.get(+teamsGames[i].TeamTwo)}`, seasonNum, "Away");
          awayTeamLogo.innerHTML = awayTeamLogoHTML;
        }
        gameResultsDiv.appendChild(awayTeamLogo);

        // Away Team Score
        const awayScore = document.createElement('div');
        awayScore.className = `awayScore ${teamsGames[i].TeamOneScore < teamsGames[i].TeamTwoScore ? 'w3-green' : teamsGames[i].TeamTwoScore == teamsGames[i].TeamOneScore ? 'w3-dark-gray' : 'w3-red'}`;
        awayScore.textContent = `${teamsGames[i].TeamTwoScore}`;
        gameResultsDiv.appendChild(awayScore);

        // Game Result Box
        const gameResultsBox = document.createElement('div');
        gameResultsBox.className = `gameResultsBox ${getGameResultClass(teamsGames[i], team)}`;
        gameResultsBox.textContent = getGameResultText(teamsGames[i], team);
        gameResultsDiv.appendChild(gameResultsBox);

        // Game Highlights
        const gameHighlights = document.createElement('div');
        gameHighlights.className = 'gameHighlights';
        gameHighlights.dataset.gameHighlights = "";
        gameHighlights.dataset.teamName = team;
        gameHighlights.dataset.gameId = teamsGames[i].GameID;
        gameHighlights.dataset.gameType = gameType;
        gameHighlights.textContent = `Game Highlights (${Gifs.filter(gif => gif.GameID == teamsGames[i].GameID).length})`;
        gameResultsDiv.appendChild(gameHighlights);

        // Game Stats
        const gameStats = document.createElement('div');
        gameStats.className = 'gameStats';
        gameStats.dataset.gameStats = "";
        gameStats.dataset.teamName = team;
        gameStats.dataset.gameId = teamsGames[i].GameID;
        gameStats.dataset.seasonNumber = seasonNum;
        gameStats.dataset.gameType = gameType;
        gameStats.textContent = 'Stats';
        gameResultsDiv.appendChild(gameStats);

        gameResultsFrag.appendChild(gameContainer);
        }
      } else {
        const scoreResults = document.createElement('h4');
        scoreResults.textContent = "No games played"
        gameResultsFrag.append(scoreResults)
      }
  
    // change header banner when team is selected from navbar
    setHeaderBanner(team, seasonNum);
  
    // change bodies background color to that of team selected
    document.body.style.backgroundColor = `#${teamsColorMAP.get(team)}`;
  
    // display data in correct div and clear previous data
    clearTablesDiv();
    clearScoreboardDiv()
    const scores = document.getElementById("scoreboardDiv");
    scores.append(gameResultsFrag)
    // listener for the back button back to teams layout Page
    document
      .getElementById("gameResultsBackButton")
      .addEventListener("click", () => {setTeamsPageLayout(document.getElementById('gameResultsBackButton'))});
    // end back button
    // highlight divs
    const gameHighlightDivs = Array.from(
      document.querySelectorAll("div[data-game-highlights]")
    );
  
    gameHighlightDivs.forEach((item) => item.addEventListener("click", (e) => {
      // scroll window back up before loading gifs
        const tablesDiv = getTablesDiv();
        tablesDiv.scrollIntoView({
          behavior: 'smooth',
          block: "center"
        });
      setTimeout(() => {
        setGifs(e)
      }, 750)
    }));
    //end highlights div
    // single games result div
    const gameResultsDataDiv = Array.from(
      document.querySelectorAll("div[data-game-stats]")
    );
    gameResultsDataDiv.forEach((item) =>
      item.addEventListener("click", setGamesData)
    );
    //end single games results div
  }
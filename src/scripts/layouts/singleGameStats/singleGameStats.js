import { GameResults, GamePlayerStats, TeamPlayers } from "../../../constants/masterHaxData.js";
import teamsMAP from "../../var_lib/maps/teams/teamsMAP.js";
import playersMAP from "../../var_lib/maps/players/playersMAP.js";
import teamsNumMAP from "../../var_lib/maps/teams/teamsNumMAP.js";
import eachTeamObjectMAP from "../../var_lib/maps/teams/eachTeamObjectMAP.js";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv.js";
import clearTablesDiv from "../../tables/clearTablesDiv.js";
import getScoreboardDiv from "../../scoreboard/getScoreboardDiv.js";
import getTablesDiv from "../../tables/getTablesDiv.js";
import getTeamsGameResults from "../getTeamsGamesResults/getTeamsGamesResults.js";
import setPlayersBoxscoreTable from "./singleGameStatsComponents/setPlayersBoxscoreTable.js"
import singleGameStatsHeader from "./singleGameStatsComponents/singleGameStatsHeader.js";
import SingleGameBoxscore from "./singleGameStatsComponents/SingleGameBoxscore.js";
  export default function setGamesData(e) {
    clearScoreboardDiv();
    clearTablesDiv();
    const scoreboardDiv = getScoreboardDiv();
    const tablesDiv = getTablesDiv();
    const gameNumber = e.target.dataset.gameId;
    const teamName = e.target.dataset.teamName;
    const gameType = e.target.dataset.gameType;
    const thisSeasonNumber = GameResults.filter(
      (item) => item.GameID == gameNumber
    )[0].SeasonNumber;
    const thisGamesResult = GameResults.filter((item) => item.GameID == gameNumber);
    // begin home team
    const thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
    const thisGamesHomeTeamColor = `#${
      eachTeamObjectMAP.get(thisGamesHomeTeam).MainColor
    }`;
    //***************************** */
  
    const thisGamesHomeTeamsPlayerRecords = TeamPlayers.filter(
      (item) =>
        item.SeasonNumber == thisSeasonNumber &&
        item.TeamID == String(teamsNumMAP.get(thisGamesHomeTeam))
    );
    const thisGamesHomeTeamPlayerNames = [];
    thisGamesHomeTeamsPlayerRecords.forEach((item) =>
      thisGamesHomeTeamPlayerNames.push(playersMAP.get(+item.PlayerID))
    );
  
    //**************************************** */
    const thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
    const thisGamesHomeTeamPossession = thisGamesResult[0].TeamOnePossession;
    const thisGamesHomeTeamShotsOnGoal = thisGamesResult[0].TeamOneShotsOnGoal;
    const thisGamesHomeTeamPasses = thisGamesResult[0].TeamOnePasses;
    const thisGamesHomeTeamKicks = thisGamesResult[0].TeamOneKicks;
    // end home team
    // begin away team
    const thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
    const thisGamesAwayTeamColor = `#${
      eachTeamObjectMAP.get(thisGamesAwayTeam).MainColor
    }`;
    //***************************** */
    const thisGamesAwayTeamsPlayerRecords = TeamPlayers.filter(
      (item) =>
        item.SeasonNumber == thisSeasonNumber &&
        item.TeamID == String(teamsNumMAP.get(thisGamesAwayTeam))
    );
    const thisGamesAwayTeamPlayerNames = [];
    thisGamesAwayTeamsPlayerRecords.forEach((item) =>
      thisGamesAwayTeamPlayerNames.push(playersMAP.get(+item.PlayerID))
    );
    //***************************************** */
    const thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
    const thisGamesAwayTeamPossession = thisGamesResult[0].TeamTwoPossession;
    const thisGamesAwayTeamShotsOnGoal = thisGamesResult[0].TeamTwoShotsOnGoal;
    const thisGamesAwayTeamPasses = thisGamesResult[0].TeamTwoPasses;
    const thisGamesAwayTeamKicks = thisGamesResult[0].TeamTwoKicks;
    // end away team
    const thisGamesHomeTeamStats = [
      thisGamesHomeTeam,
      thisGamesHomeTeamScore,
      thisGamesHomeTeamPossession,
      thisGamesHomeTeamShotsOnGoal,
      thisGamesHomeTeamPasses,
      thisGamesHomeTeamKicks,
    ];
    const thisGamesAwayTeamStats = [
      thisGamesAwayTeam,
      thisGamesAwayTeamScore,
      thisGamesAwayTeamPossession,
      thisGamesAwayTeamShotsOnGoal,
      thisGamesAwayTeamPasses,
      thisGamesAwayTeamKicks,
    ];
    // boxscore div container
    const singleGameStatsHeaderArguments = {
      teamName, thisSeasonNumber, gameType, thisGamesHomeTeam, thisGamesAwayTeam
    }
    // // this is the header containing back button and team css logos
    tablesDiv.append(singleGameStatsHeader(singleGameStatsHeaderArguments))
    // end team logos
  
    // this section is the green team boxscore stats
    // create arguments object
    const singleScoreBoxscoreArguments = {
      thisGamesHomeTeamColor,
      thisGamesAwayTeamColor,
      thisGamesHomeTeamStats,
      thisGamesAwayTeamStats
    }
    scoreboardDiv.append(SingleGameBoxscore(singleScoreBoxscoreArguments))

    // listener for the back button back to teams layout Page
    document
      .getElementById("gamesBoxscoreBackButton")
      .addEventListener("click", getTeamsGameResults);
    // end back button

    // begin player stats data
    const thisGamesPlayerStats = GamePlayerStats.filter(
      (item) => item.GameID == gameNumber
    );
    const thisGamesPlayerStatMAPS = [];
    for (let i = 0; i < thisGamesPlayerStats.length; i++) {
      thisGamesPlayerStatMAPS.push(
        new Map(Object.entries(thisGamesPlayerStats[i]))
      );
      thisGamesPlayerStatMAPS[i].set(
        "Points",
        +thisGamesPlayerStatMAPS[i].get("Goals") +
          +thisGamesPlayerStatMAPS[i].get("Assists")
      );
    }
    // players boxscore stats begin here
    const setPlayersBoxscoreTableArguments = {
      thisGamesPlayerStatMAPS,
      thisGamesHomeTeamPlayerNames,
      thisGamesHomeTeamColor,
      thisGamesAwayTeamColor
    }
    setPlayersBoxscoreTable(null, setPlayersBoxscoreTableArguments);
    // end players game stats table

    // scroll to top of boxscore page from when clicking on gameStats further down the list
    setTimeout(() => {
      tablesDiv.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }, 50)
  }
  
  //end data containers
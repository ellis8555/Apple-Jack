import { GameResults, GamePlayerStats, TeamPlayers } from "../../../constants/masterHaxData.js";
import teamsMAP from "../../var_lib/maps/teams/teamsMAP.js";
import playersMAP from "../../var_lib/maps/players/playersMAP.js";
import teamsNumMAP from "../../var_lib/maps/teams/teamsNumMAP.js";
import eachTeamObjectMAP from "../../var_lib/maps/teams/eachTeamObjectMAP.js";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv.js";
import clearTablesDiv from "../../tables/clearTablesDiv.js";
import getScoreboardDiv from "../../scoreboard/getScoreboardDiv.js";
import getTablesDiv from "../../tables/getTablesDiv.js";
import getTeamsGameResults from "../getTeamsGamesResults.js";
import setPlayersBoxscoreTable from "./helpers/setPlayersBoxscoreTable.js"
import singleGameStatsHeader from "./singleGameStatsComponents/singleGameStatsHeader.js";
import SingleGameBoxscore from "./singleGameStatsComponents/SingleGameBoxscore.js";
  export default function setGamesData(e) {
    clearScoreboardDiv();
    clearTablesDiv();
    getScoreboardDiv();
    getTablesDiv();
    let gameNumber = e.target.dataset.gameId;
    let teamName = e.target.dataset.teamName;
    let gameType = e.target.dataset.gameType;
    let thisSeasonNumber = GameResults.filter(
      (item) => item.GameID == gameNumber
    )[0].SeasonNumber;
    let thisGamesResult = GameResults.filter((item) => item.GameID == gameNumber);
    // begin home team
    let thisGamesHomeTeam = teamsMAP.get(+thisGamesResult[0].TeamOne);
    let thisGamesHomeTeamColor = `#${
      eachTeamObjectMAP.get(thisGamesHomeTeam).MainColor
    }`;
    //***************************** */
  
    let thisGamesHomeTeamsPlayerRecords = TeamPlayers.filter(
      (item) =>
        item.SeasonNumber == thisSeasonNumber &&
        item.TeamID == String(teamsNumMAP.get(thisGamesHomeTeam))
    );
    let thisGamesHomeTeamPlayerNames = [];
    thisGamesHomeTeamsPlayerRecords.forEach((item) =>
      thisGamesHomeTeamPlayerNames.push(playersMAP.get(+item.PlayerID))
    );
  
    //**************************************** */
    let thisGamesHomeTeamScore = thisGamesResult[0].TeamOneScore;
    let thisGamesHomeTeamPossession = thisGamesResult[0].TeamOnePossession;
    let thisGamesHomeTeamShotsOnGoal = thisGamesResult[0].TeamOneShotsOnGoal;
    let thisGamesHomeTeamPasses = thisGamesResult[0].TeamOnePasses;
    let thisGamesHomeTeamKicks = thisGamesResult[0].TeamOneKicks;
    // end home team
    // begin away team
    let thisGamesAwayTeam = teamsMAP.get(+thisGamesResult[0].TeamTwo);
    let thisGamesAwayTeamColor = `#${
      eachTeamObjectMAP.get(thisGamesAwayTeam).MainColor
    }`;
    //***************************** */
    let thisGamesAwayTeamsPlayerRecords = TeamPlayers.filter(
      (item) =>
        item.SeasonNumber == thisSeasonNumber &&
        item.TeamID == String(teamsNumMAP.get(thisGamesAwayTeam))
    );
    let thisGamesAwayTeamPlayerNames = [];
    thisGamesAwayTeamsPlayerRecords.forEach((item) =>
      thisGamesAwayTeamPlayerNames.push(playersMAP.get(+item.PlayerID))
    );
    //***************************************** */
    let thisGamesAwayTeamScore = thisGamesResult[0].TeamTwoScore;
    let thisGamesAwayTeamPossession = thisGamesResult[0].TeamTwoPossession;
    let thisGamesAwayTeamShotsOnGoal = thisGamesResult[0].TeamTwoShotsOnGoal;
    let thisGamesAwayTeamPasses = thisGamesResult[0].TeamTwoPasses;
    let thisGamesAwayTeamKicks = thisGamesResult[0].TeamTwoKicks;
    // end away team
    let thisGamesHomeTeamStats = [
      thisGamesHomeTeam,
      thisGamesHomeTeamScore,
      thisGamesHomeTeamPossession,
      thisGamesHomeTeamShotsOnGoal,
      thisGamesHomeTeamPasses,
      thisGamesHomeTeamKicks,
    ];
    let thisGamesAwayTeamStats = [
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
    let thisGamesPlayerStats = GamePlayerStats.filter(
      (item) => item.GameID == gameNumber
    );
    let thisGamesPlayerStatMAPS = [];
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
  }
  
  //end data containers
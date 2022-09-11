import {
  gameResults,
  teamsMAP,
  teamsNumMAP,
  eachTeamObjectMAP,
  teamPlayers,
  playersMAP,
} from "../../../../../json/masterVars.js";
import sortGroupedStats from "../../../sort.js";

console.log(gameResults);
export function getMostGoalsScoredByATeam(seasonMode) {
  const goalsContainingArr = [];
  gameResults.forEach((game) => {
    const gameID = +game.GameID;
    const homeGoals = +game.TeamOneScore;
    const awayGoals = +game.TeamTwoScore;
    const thisGamesData = {};
    thisGamesData.gameID = gameID;

    if (homeGoals > awayGoals) {
      thisGamesData.whichSide = "TeamOneScore";
      thisGamesData.goals = homeGoals;
      goalsContainingArr.push(thisGamesData);
    } else if (homeGoals < awayGoals) {
      thisGamesData.whichSide = "TeamTwoScore";
      thisGamesData.goals = awayGoals;
      goalsContainingArr.push(thisGamesData);
    } else {
      thisGamesData.whichSide = "TeamOneScore";
      thisGamesData.goals = homeGoals;
      goalsContainingArr.push(thisGamesData);
    }
  });

  const getEachUniqueGoalCount = new Set();
  goalsContainingArr.forEach((getGoals) => {
    getEachUniqueGoalCount.add(getGoals.goals);
  });
  const sortEachUniqueGoalCount = [...getEachUniqueGoalCount].sort((a, b) => {
    return b - a;
  });

  const getTopThreeGoalsGameID = goalsContainingArr.filter((game) => {
    return game.goals >= sortEachUniqueGoalCount[2];
  });

  const getTopThreeGoalsScoredGameResults = [];
  getTopThreeGoalsGameID.forEach((getGame) => {
    gameResults.forEach((findGameID) => {
      if (findGameID.GameID == getGame.gameID) {
        getTopThreeGoalsScoredGameResults.push(findGameID);
      }
    });
  });

  // NEED TO EXTRACT WHICH SIDE IS THE HIGHER COUNT AND ALSO FILTER FROM SEASON MODE
  console.log(getTopThreeGoalsScoredGameResults);
}

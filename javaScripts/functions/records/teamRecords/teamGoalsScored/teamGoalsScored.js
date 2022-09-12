import filterGameResults from "../../genericRecordFunctions/filterGameResults.js";
import createRecordDisplay from "../../genericRecordFunctions/createRecordDisplay.js";

export function getMostGoalsScoredByATeam(seasonMode) {
  const gameResults = filterGameResults(seasonMode);
  let title;
  switch (seasonMode) {
    case "Season":
      title = "Most goals scored by a team in a season game";
      break;
    case "Playoff":
      title = "Most goals scored by a team in a playoff game";
      break;
    default:
      title = "Most goals scored in a game all time";
  }

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

  const most = getTopThreeGoalsScoredGameResults.filter((game) => {
    if (+game.TeamTwoScore == sortEachUniqueGoalCount[0]) return game;
    if (+game.TeamOneScore == sortEachUniqueGoalCount[0]) return game;
  });

  const secondMost = getTopThreeGoalsScoredGameResults.filter((game) => {
    if (+game.TeamTwoScore == sortEachUniqueGoalCount[1]) return game;
    if (+game.TeamOneScore == sortEachUniqueGoalCount[1]) return game;
  });

  const thirdMost = getTopThreeGoalsScoredGameResults.filter((game) => {
    if (+game.TeamTwoScore == sortEachUniqueGoalCount[2]) return game;
    if (+game.TeamOneScore == sortEachUniqueGoalCount[2]) return game;
  });

  // top 3 highest goal output in sorted order!

  const sortedResult = [...most, ...secondMost, ...thirdMost];
  console.log(sortedResult);

  // begin to display the records
  createRecordDisplay(title);
}

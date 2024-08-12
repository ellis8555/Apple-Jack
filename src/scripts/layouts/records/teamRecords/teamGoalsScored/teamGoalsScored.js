import clearScoreboardDiv from "../../../../scoreboard/clearScoreboardDiv.js";
import filterGameResults from "../../genericRecordFunctions/filterGameResults.js";
import getTeamLogo from "../../genericRecordFunctions/getTeamLogo.js";
import createIndividualRecord from "../../recordViews/createIndividualRecord.js";

export default function teamGoalsScored(e) {
  clearScoreboardDiv();
  // get the previously displayed records in order to remove them when another record is requested from the user
  const getSingleRecordContainers =
    document.querySelectorAll(".recordTitleDiv");
  // remove records and display user requested different records
  getSingleRecordContainers.forEach((record) => {
    record.remove();
  });
  const seasonMode = e.target.dataset.seasonmode;
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

  // begin to display the records

  // grab the element to append each new record to
  const allRecordsContainingDiv = document.querySelector(".recordsContainer");
  // create sub containing div that will hold all the individual records encased under one title
  const titleContainingDiv = document.createElement("div");
  titleContainingDiv.classList = "recordTitleDiv w3-panel w3-round";
  titleContainingDiv.innerHTML = `<h1>${title}</h1>`;

  // for each record set the layout with the correct data for each record
  sortedResult.forEach((game) => {
    // title is set above
    let teamLogo;
    let recordGoals;
    let seasonNumber = game.SeasonNumber;
    let homeTeam = +game.TeamOne;
    let awayTeam = +game.TeamTwo;
    let team;
    let homeTeamGoals = +game.TeamOneScore;
    let awayTeamGoals = +game.TeamTwoScore;
    if (homeTeamGoals > awayTeamGoals) {
      teamLogo = getTeamLogo(homeTeam, game.SeasonNumber);
      recordGoals = homeTeamGoals;
      team = +game.TeamOne;
    } else {
      teamLogo = getTeamLogo(awayTeam, game.SeasonNumber);
      recordGoals = awayTeamGoals;
      team = +game.TeamTwo;
    }
    const thisRecordData = createIndividualRecord(
      teamLogo,
      "Goals",
      recordGoals,
      seasonNumber,
      team
    );
    titleContainingDiv.append(thisRecordData);
    allRecordsContainingDiv.append(titleContainingDiv);
  });
}

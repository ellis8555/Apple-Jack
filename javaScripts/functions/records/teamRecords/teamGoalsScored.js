import {
  gameResults,
  teamsMAP,
  teamsNumMAP,
  eachTeamObjectMAP,
  teamPlayers,
  playersMAP,
} from "../../../../json/masterVars.js";
import {
  closeSidebar,
  clearScoreboardDiv,
  getScoreboardDiv,
  clearTablesDiv,
} from "../../variousFunctions.js";

export function getMostGoalsScoredByATeam() {
  clearTablesDiv();
  clearScoreboardDiv();
  closeSidebar();
  getScoreboardDiv();
  const highestHomeTeamScore = Math.max(
    ...Array.from(new Set(gameResults.map((score) => score.TeamOneScore)))
  );
  const highestAwayTeamScore = Math.max(
    ...Array.from(new Set(gameResults.map((score) => score.TeamTwoScore)))
  );
  const allTimeMostGoalsScoredByTeam = Math.max(
    ...Array.from(new Set([highestHomeTeamScore, highestAwayTeamScore]))
  ).toString();

  function getResult(game) {
    if (game.TeamOneScore == allTimeMostGoalsScoredByTeam) {
      return true;
    }
    if (game.TeamTwoScore == allTimeMostGoalsScoredByTeam) {
      return true;
    }
  }

  const getGameRecords = gameResults.filter(getResult);

  let recordHolder;

  if (getGameRecords[0].TeamOneScore == allTimeMostGoalsScoredByTeam) {
    recordHolder = teamsMAP.get(Number(getGameRecords[0].TeamOne));
  } else {
    recordHolder = teamsMAP.get(Number(getGameRecords[0].TeamTwo));
  }

  function identifyTeamMembers(player) {
    if (
      player.TeamID == teamsNumMAP.get(recordHolder) &&
      player.SeasonNumber == getGameRecords[0].SeasonNumber
    ) {
      return true;
    }
  }

  const getTeamMembers = teamPlayers.filter(identifyTeamMembers);

  console.log(getTeamMembers);
  let data = `<div class="w3-red w3-padding w3-round">Under contstruction</div><br>`;
  data += `<div style="text-align:left;" class="w3-blue w3-round w3-padding w3-card-4">`;
  data += `Most goals scored in a game by a team: <b>${allTimeMostGoalsScoredByTeam}</b><br>`;
  data += `Team: <span class="w3-round"style="background-color: #${
    eachTeamObjectMAP.get(recordHolder).MainColor
  }">${recordHolder}</span><br>`;
  data += ` Members: `;
  getTeamMembers.forEach((player) => {
    data += `${playersMAP.get(Number(player.PlayerID))}, `;
  });
  data += `<br>`;
  data += `Season: ${getGameRecords[0].SeasonNumber}`;
  data += `</div>`;

  scoreboardDiv.innerHTML = data;
}

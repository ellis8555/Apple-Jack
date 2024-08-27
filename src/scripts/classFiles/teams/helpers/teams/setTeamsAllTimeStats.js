import { GameResults } from "../../../../../constants/masterHaxData";
import { GAME_RESULTS_LENGTH } from "../../../../../constants/consts/vars";
import teamsMAP from "../../../../var_lib/maps/teams/teamsMAP";
import gameTypeMAP from "../../../../var_lib/maps/gameType/gameTypeMAP";


function setTeamsAllTimeStats(allTimeArray, allTimeSeasonArray, allTimePlayoffArray) {
  GameResults.forEach((item) => {
    if (
      teamsMAP.get(Number(item.TeamOne)) == this.name ||
      teamsMAP.get(Number(item.TeamTwo)) == this.name
    ) {
      this[allTimeArray].push(item);
    }
  });

  this[allTimeArray].forEach((item) => {
    for (let i = 0; i < GAME_RESULTS_LENGTH; i++) {
      if (
        item.GameID == GameResults[i].GameID &&
        gameTypeMAP.get(Number(GameResults[i].GameTypeID)) == "Season"
      )
        this[allTimeSeasonArray].push(item);
      if (
        item.GameID == GameResults[i].GameID &&
        gameTypeMAP.get(Number(GameResults[i].GameTypeID)) == "Playoff"
      )
        this[allTimePlayoffArray].push(item);
    }
  });
}

export default setTeamsAllTimeStats;

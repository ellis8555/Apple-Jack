import { GameResults, GamePlayerStats } from "../../../../constants/masterHaxData";
import playersMAP from "../../../var_lib/maps/players/playersMAP";
import gameTypeMAP from "../../../var_lib/maps/gameType/gameTypeMAP";

const GameResultsLength = GameResults.length;

function setPlayersAllTimeStats(
    allTimeArray,
    allTimeSeasonArray,
    allTimePlayoffArray){
        GamePlayerStats.forEach((item) => {
            if (playersMAP.get(Number(item.PlayerID)) == this.name) {
              this[allTimeArray].push(item);
            }
          });
      
          this[allTimeArray].forEach((item) => {
            for (let i = 0; i < GameResultsLength; i++) {
              // GameResultsLength
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

export default setPlayersAllTimeStats;
// map a list of season modes by Name to number (Season or Playoff)
import { GAME_TYPE_LENGTH } from "../../../../constants/consts/vars";
import { GameType } from "../../../../constants/masterHaxData";

const gameTypeNumMAP = new Map();

for (let i = 0; i < GAME_TYPE_LENGTH; i++) {
    // map a list of season modes by Name to number (Season or Playoff)
    gameTypeNumMAP.set(GameType[i].GameType, Number(GameType[i].GameTypeID));
  }

  export default gameTypeNumMAP;
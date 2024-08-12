// map a list of season modes by Number to name (Season or Playoff)

import { GAME_TYPE_LENGTH } from "../../../../constants/consts/vars";
import { GameType } from "../../../../constants/masterHaxData";

const gameTypeMAP = new Map();

for (let i = 0; i < GAME_TYPE_LENGTH; i++) {
    // map a list of season modes by Number to name (Season or Playoff)
    gameTypeMAP.set(Number(GameType[i].GameTypeID), GameType[i].GameType);
  }

export default gameTypeMAP;
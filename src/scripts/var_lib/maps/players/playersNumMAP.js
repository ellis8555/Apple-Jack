// maps key as textual name key to playerID value
import { PLAYERS_LENGTH } from "../../../../constants/consts/vars";
import { Players } from "../../../../constants/masterHaxData";

const playersNumMAP = new Map();

for (let i = 0; i < PLAYERS_LENGTH; i++) {
    // map a list of players textual key to number value nameID
    playersNumMAP.set(Players[i].Players, Number(Players[i].PlayerID));
  }

export default playersNumMAP;
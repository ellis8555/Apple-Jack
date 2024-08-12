// maps key as playerID to textual value of players name
import { PLAYERS_LENGTH } from "../../../../constants/consts/vars"
import { Players } from "../../../../constants/masterHaxData";

const playersMAP = new Map();

for (let i = 0; i < PLAYERS_LENGTH; i++) {
    // map a list of players number key to textual value
    playersMAP.set(Number(Players[i].PlayerID), Players[i].Players);
  }

export default playersMAP;
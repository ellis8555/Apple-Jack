// map a list what seasons each player played in
import { PLAYERS_LENGTH } from "../../../../constants/consts/vars";
import { TeamPlayers } from "../../../../constants/masterHaxData";
import playersMAP from "./playersMAP"

const playerSeasonsMAP = new Map();

for (let i = 0; i < PLAYERS_LENGTH; i++) {
    // map a list what seasons each player played in
    playerSeasonsMAP.set(
      playersMAP.get(i + 1),
      Array.from(
        TeamPlayers
          .filter((item) => item.PlayerID == i + 1)
          .map((item) => item.SeasonNumber)
      ).sort()
    );
  }

export default playerSeasonsMAP;
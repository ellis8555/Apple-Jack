// maps via key as textual name to array of which seasons team competed in
import teamsMAP from "./teamsMAP"
import teamsNumMAP from "./teamsNumMAP"
import { TeamPlayers } from "../../../../constants/masterHaxData"

const teamsSeasonsMAP = new Map()

for (let i = 1; i <= teamsMAP.size; i++) {
    teamsSeasonsMAP.set(
      teamsMAP.get(i),
      Array.from(
        new Set(
          TeamPlayers
            .filter((item) => item.TeamID == teamsNumMAP.get(teamsMAP.get(i)))
            .map((item) => item.SeasonNumber)
        )
      )
    );
  }

export default teamsSeasonsMAP
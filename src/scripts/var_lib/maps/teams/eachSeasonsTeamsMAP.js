// maps via key as number representing season to array value of which teams competed that season
import seasonCount from "../../season/seasonCount"
import { TeamPlayers } from "../../../../constants/masterHaxData"
import teamsMAP from "./teamsMAP";

const eachSeasonsTeamsMAP = new Map();

for (let i = 1; i <= seasonCount.length; i++) {
    eachSeasonsTeamsMAP.set(
      i,
      Array.from(
        new Set(
          TeamPlayers
            .filter((item) => item.SeasonNumber == i)
            .map((item) => teamsMAP.get(+item.TeamID))
        )
      )
    );
  }

export default eachSeasonsTeamsMAP;
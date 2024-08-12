// gets the most recent season that has been played or is currently running

import {TeamPlayers} from "../../../constants/masterHaxData"

const currentSeason = Math.max(
    ...Array.from(new Set(TeamPlayers.map((item) => +item.SeasonNumber)))
  );

export default currentSeason
//get count of how many seasons in order to create arrays for each season

  import {TeamPlayers} from "../../../constants/masterHaxData"

  const seasonCount = Array.from(
    //get count of how many seasons in order to create arrays for each season
    new Set(TeamPlayers.map((item) => item.SeasonNumber))
  );

  export default seasonCount;
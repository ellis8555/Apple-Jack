// maps out each teams basic info. ID, Color, logo file path, etc...
import { TEAMS_LENGTH, TEAM_NAMES_ARRAY } from "../../../../constants/consts/vars";
import { Teams } from "../../../../constants/masterHaxData";

const eachTeamObjectMAP = new Map();

for (let i = 0; i < TEAMS_LENGTH; i++) {
    TEAM_NAMES_ARRAY[i] = Teams[i].TeamName;
    eachTeamObjectMAP.set(TEAM_NAMES_ARRAY[i], Teams[i]);
  }

  export default eachTeamObjectMAP;
// maps teams via key is teamID number to textual name as value
import { Teams } from "../../../../constants/masterHaxData";
import { TEAMS_LENGTH } from "../../../../constants/consts/vars";

const teamsMAP = new Map()

for (let i = 0; i < TEAMS_LENGTH; i++) {
    // map a list of teams with ID number to name
    teamsMAP.set(Number(Teams[i].TeamID), Teams[i].TeamName);
  }

  export default teamsMAP;
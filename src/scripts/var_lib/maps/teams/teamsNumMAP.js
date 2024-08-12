// maps teams via key as textual name to teamID number
import { Teams } from "../../../../constants/masterHaxData";
import { TEAMS_LENGTH } from "../../../../constants/consts/vars";

const teamsNumMAP = new Map();

for (let i = 0; i < TEAMS_LENGTH; i++) {
    // map a list of teams with ID number to name
    teamsNumMAP.set(Teams[i].TeamName, Number(Teams[i].TeamID));
  }

export default teamsNumMAP;
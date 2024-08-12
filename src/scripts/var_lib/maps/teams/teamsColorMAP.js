// maps teams main color with ID number
import teamsMAP from "./teamsMAP";
import { Teams } from "../../../../constants/masterHaxData";

const teamsColorMAP = new Map();

for (let i = 0; i < teamsMAP.size; i++) {
    teamsColorMAP.set(teamsMAP.get(i + 1), Teams[i].MainColor);
  }

export default teamsColorMAP;
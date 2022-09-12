import { teamsMAP, eachTeamObjectMAP } from "../../../../json/masterVars.js";

export default function getTeamsBackgroundColor(team) {
  const teamName = teamsMAP.get(team);
  const teamColor = eachTeamObjectMAP.get(teamName).MainColor;
  return teamColor;
}

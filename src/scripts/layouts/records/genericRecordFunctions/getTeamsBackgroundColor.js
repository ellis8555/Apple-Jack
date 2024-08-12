import teamsMAP from "../../../var_lib/maps/teams/teamsMAP.js"
import eachTeamObjectMAP from "../../../var_lib/maps/teams/eachTeamObjectMAP.js"

export default function getTeamsBackgroundColor(team) {
  const teamName = teamsMAP.get(team);
  const teamColor = eachTeamObjectMAP.get(teamName).MainColor;
  return teamColor;
}

import teamsMAP from "../../../var_lib/maps/teams/teamsMAP.js"
import eachTeamObjectMAP from "../../../var_lib/maps/teams/eachTeamObjectMAP.js"

export default function getTeamLogo(team, seasonNumber) {
  let teamLogoFilePath;
  const thisTeam = teamsMAP.get(team);
  teamLogoFilePath =
    eachTeamObjectMAP.get(thisTeam)[`S0${seasonNumber}HomeFilePath`];
  return teamLogoFilePath;
}

import { teamsMAP, eachTeamObjectMAP } from "../../../../json/masterVars.js";

export default function getTeamLogo(team, seasonNumber) {
  let teamLogoFilePath;
  const thisTeam = teamsMAP.get(team);
  teamLogoFilePath =
    eachTeamObjectMAP.get(thisTeam)[`S0${seasonNumber}HomeFilePath`];
  return teamLogoFilePath;
}

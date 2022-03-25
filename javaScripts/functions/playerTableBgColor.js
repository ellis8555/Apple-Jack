import {
  teamPlayers,
  teamsMAP,
  currentSeason,
  playersNumMAP,
  eachTeamObjectMAP,
} from "../../json/masterVars.js";

export default function setPlayersTableBgColor() {
  let playerRow = document.querySelectorAll("td[data-field-name='Name']");
  playerRow.forEach((item) => {
    let playersName = item.textContent;
    let playersID = playersNumMAP.get(playersName);
    let playersTeams = teamPlayers.filter((item) => item.PlayerID == playersID);
    playersTeams.sort((a, b) => a.SeasonNumber - b.SeasonNumber);
    let getPlayersMostRecentSeasonsRecord =
      playersTeams[playersTeams.length - 1];
    if (+getPlayersMostRecentSeasonsRecord.SeasonNumber == currentSeason) {
      let playersMostRecentTeam = getPlayersMostRecentSeasonsRecord.TeamID;
      let playersTeamName = teamsMAP.get(+playersMostRecentTeam);
      item.style.backgroundColor = `#${
        eachTeamObjectMAP.get(playersTeamName).MainColor
      }`;
      item.style.color = "white";
    }
  });
}

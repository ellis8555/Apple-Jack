import { TeamPlayers } from "../../constants/masterHaxData";
import teamsMAP from "../var_lib/maps/teams/teamsMAP";
import currentSeason from "../var_lib/season/currentSeason";
import playersNumMAP from "../var_lib/maps/players/playersNumMAP";
import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";

  
  export default function setPlayersTableBgColor(seasonNumber = currentSeason) {
    let playerRow = document.querySelectorAll("td[data-field-name='Name']");
    if (seasonNumber > 0) {
      let thisSeasonNumbersRecords = TeamPlayers.filter(
        (item) => item.SeasonNumber == seasonNumber
      );
      playerRow.forEach((item) => {
        let playersName = item.textContent;
        let playersID = playersNumMAP.get(playersName);
        let playersTeamRecord = thisSeasonNumbersRecords.filter(
          (item) => item.PlayerID == playersID
        );
        let playersTeam = +playersTeamRecord[0].TeamID;
        let playersTeamName = teamsMAP.get(playersTeam);
        item.style.backgroundColor = `#${
          eachTeamObjectMAP.get(playersTeamName).MainColor
        }`;
        item.style.color = "white";
      });
    } else {
      playerRow.forEach((item) => {
        let playersName = item.textContent;
        let playersID = playersNumMAP.get(playersName);
        let playersTeams = TeamPlayers.filter(
          (item) => item.PlayerID == playersID
        );
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
  }
import { sortTable } from "../setData/setTables/teamsTables.js";
import setTeamsTableBgColor from "./teamTableBgColor.js";
import { getTeamsPlayersPerSeasonResized } from "./teamPlayerList.js";

export default function screenResize() {
  // insert fetch data function onto <TD> elements in mobile view
  let screenSize = window.innerWidth;
  let teamPlayersDataSource = document.getElementById("playerStatsBackButton");
  if (!teamPlayersDataSource) {
    let regularScreen = document.querySelectorAll("#tablesDiv table th");
    let mobileTableData = document.querySelectorAll("#tablesDiv table td");
    if (screenSize < 993) {
      mobileTableData.forEach((item) =>
        item.addEventListener("click", sortTable)
      );
      setTeamsTableBgColor();
    } else {
      regularScreen.forEach((item) =>
        item.addEventListener("click", sortTable)
      );
    }
  } else {
    //these next three variables are parameters for the event listener callback function
    let team = teamPlayersDataSource.dataset.teamName;
    let seasonNumber = teamPlayersDataSource.dataset.seasonNum;
    let teamLogo = teamPlayersDataSource.dataset.teamLogo;

    // these six variables are either the table headers or table data that event listeners will be assigned to.
    let regularTeamPlayerSeasonTable = document.querySelectorAll(
      "#teamPlayerSeasonTable th"
    );
    let mobileTeamPlayerSeasonTable = document.querySelectorAll(
      "#teamPlayerSeasonTable td"
    );
    let regularTeamPlayerPlayoffTable = document.querySelectorAll(
      "#teamPlayerPlayoffTable th"
    );
    let mobileTeamPlayerPlayoffTable = document.querySelectorAll(
      "#teamPlayerPlayoffTable td"
    );
    let regularTeamPlayerCombinedTable = document.querySelectorAll(
      "#teamPlayerCombinedTable th"
    );
    let mobileTeamPlayerCombinedTable = document.querySelectorAll(
      "#teamPlayerCombinedTable td"
    );
    if (screenSize < 993) {
      mobileTeamPlayerSeasonTable.forEach((item) =>
        item.addEventListener(
          "click",
          getTeamsPlayersPerSeasonResized(team, seasonNumber, teamLogo)
        )
      );
      mobileTeamPlayerPlayoffTable.forEach((item) =>
        item.addEventListener(
          "click",
          getTeamsPlayersPerSeasonResized(team, seasonNumber, teamLogo)
        )
      );
      mobileTeamPlayerCombinedTable.forEach((item) =>
        item.addEventListener(
          "click",
          getTeamsPlayersPerSeasonResized(team, seasonNumber, teamLogo)
        )
      );
      setTeamsTableBgColor();
    } else {
      regularTeamPlayerSeasonTable.forEach((item) =>
        item.addEventListener(
          "click",
          getTeamsPlayersPerSeasonResized(team, seasonNumber, teamLogo)
        )
      );
      regularTeamPlayerPlayoffTable.forEach((item) =>
        item.addEventListener(
          "click",
          getTeamsPlayersPerSeasonResized(team, seasonNumber, teamLogo)
        )
      );
      regularTeamPlayerCombinedTable.forEach((item) =>
        item.addEventListener(
          "click",
          getTeamsPlayersPerSeasonResized(team, seasonNumber, teamLogo)
        )
      );
    }
  }
}

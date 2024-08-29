import setPlayersBoxscoreTable from "../../../../layouts/singleGameStats/singleGameStatsComponents/setPlayersBoxscoreTable";

function playerBoxscoreTableListeners({thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor}) {
    let browserWidth = window.innerWidth;
    if (browserWidth < 982) {
      let mobileTableCells = document.querySelectorAll("#boxscorePlayerStats td");
      let eachCell = Array.from(mobileTableCells);
      eachCell.forEach((field) =>
        field.addEventListener("click", (e) =>
          setPlayersBoxscoreTable(e, { thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor })
        )
      );
    } else {
      let getFieldNames = document.querySelectorAll("#boxscorePlayerStats th");
      let headers = Array.from(getFieldNames);
      headers.forEach((field) =>
        field.addEventListener("click", (e) =>
          setPlayersBoxscoreTable(e, { thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor })
        )
      );
    }
  }

export default playerBoxscoreTableListeners;
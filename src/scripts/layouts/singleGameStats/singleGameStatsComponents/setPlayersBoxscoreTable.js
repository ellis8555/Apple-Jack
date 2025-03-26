import sortGroupedStats from "../../../misc/sorting/sort";
import playerBoxscoreTableListeners from "../../../listeners/pageListeners/boxscorePage/boxscorePlayerTables/playerBoxscoreTableListeners"
import updatePlayersBoxscoreTableResizeListener from "../../../listeners/pageListeners/boxscorePage/boxscorePlayerTables/updatePlayersBoxscoreTableResizeListener";
import { SINGLE_GAME_PLAYERS_TABLE } from "../../../../constants/consts/supportVars"
import boxscorePlayersTableHeadersElements from "./helpers/boxscorePlayersTableHeadersElements";
import boxscorePlayersTableDataElements from "./helpers/boxscorePlayersTableDataElements";

function setPlayersBoxscoreTable(e, {thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor}) {
  let sortBy;
  if (e) {
    sortBy = e.target.dataset.fieldName;
  } else {
    sortBy = "Points";
  }

    sortGroupedStats(thisGamesPlayerStatMAPS, sortBy);
    const playerStatsContainer = document.querySelector("#boxscorePlayerStats");
    playerStatsContainer.innerHTML = "";

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.style.marginBottom = "1.5rem";
    caption.style.fontWeight = "bold";
    caption.textContent = "Player stats"
    table.append(caption)
    const thead = boxscorePlayersTableHeadersElements(SINGLE_GAME_PLAYERS_TABLE, sortBy)
    table.append(thead)
    const tableBody = document.createElement('tbody');
    const td = boxscorePlayersTableDataElements(thisGamesPlayerStatMAPS, SINGLE_GAME_PLAYERS_TABLE, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor, sortBy)
    tableBody.append(td)
    table.append(tableBody)
    playerStatsContainer.append(table)

// add listeners to the table headers
playerBoxscoreTableListeners({ thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor });

// update listeners on resize event. this is debounced
updatePlayersBoxscoreTableResizeListener({thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor});
}

export default setPlayersBoxscoreTable;
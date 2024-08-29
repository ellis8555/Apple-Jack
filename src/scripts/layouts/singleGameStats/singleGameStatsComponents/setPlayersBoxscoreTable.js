import sortGroupedStats from "../../../misc/sorting/sort";
import playersMAP from "../../../var_lib/maps/players/playersMAP";
import playerBoxscoreTableListeners from "../../../listeners/pageListeners/boxscorePage/boxscorePlayerTables/playerBoxscoreTableListeners"
import updatePlayersBoxscoreTableResizeListener from "../../../listeners/pageListeners/boxscorePage/boxscorePlayerTables/updatePlayersBoxscoreTableResizeListener";
import { PLAYERS_TABLE } from "../../../../constants/consts/supportVars"

const fieldsLength = PLAYERS_TABLE.length;

function setPlayersBoxscoreTable(e, {thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor}) {
    let sortBy;
    if (e) {
      sortBy = e.target.dataset.fieldName;
    } else {
      sortBy = "Points";
    }
    sortGroupedStats(thisGamesPlayerStatMAPS, sortBy);
    let playerStatsContainer = document.querySelector("#boxscorePlayerStats");
    let playersData = "";
    // begin players game stats table
    playersData += `<table>`;
    // html table thead
    playersData += "<thead><tr>";
    for (let i = 0; i < fieldsLength; i++) {
      if (PLAYERS_TABLE[i] == sortBy) {
        playersData +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          PLAYERS_TABLE[i] +
          ` class="w3-orange">` +
          PLAYERS_TABLE[i] +
          "</th>";
      } else {
        playersData +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          PLAYERS_TABLE[i] +
          " >" +
          PLAYERS_TABLE[i] +
          "</th>";
      }
    }
    playersData += "</tr></thead>";
    // end of html table header fields row
    thisGamesPlayerStatMAPS.forEach((item) => {
      // table data begins for each field
      playersData += "<tr>";
      for (let j = 0; j < fieldsLength; j++) {
        if (PLAYERS_TABLE[j] == sortBy) {
          playersData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            PLAYERS_TABLE[j] +
            ` class="w3-yellow">` + // add yellow background for sorted column points
            item.get(PLAYERS_TABLE[j]) +
            "</td>";
        } else if (PLAYERS_TABLE[j] == "Name") {
          if (
            thisGamesHomeTeamPlayerNames.includes(
              playersMAP.get(+item.get("PlayerID"))
            )
          ) {
            playersData +=
              `<td data-field-name=` + //data-fieldNames required for mobile layout
              PLAYERS_TABLE[j] +
              ` style="background-color:${thisGamesHomeTeamColor};color:#fff">` +
              playersMAP.get(+item.get("PlayerID")) +
              "</td>";
          } else {
            playersData +=
              `<td data-field-name=` + //data-fieldNames required for mobile layout
              PLAYERS_TABLE[j] +
              ` style="background-color:${thisGamesAwayTeamColor};color:#fff">` +
              playersMAP.get(+item.get("PlayerID")) +
              "</td>";
          }
        } else {
          playersData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            PLAYERS_TABLE[j] +
            " >" +
            item.get(PLAYERS_TABLE[j]) +
            "</td>";
        }
      }

      playersData += "</tr>";
    });
    playersData += `</table>`;
    playerStatsContainer.innerHTML = playersData;

// add listeners to the table headers
playerBoxscoreTableListeners({ thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor });

// update listeners on resize event. this is debounced
updatePlayersBoxscoreTableResizeListener({thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor});
}

export default setPlayersBoxscoreTable;
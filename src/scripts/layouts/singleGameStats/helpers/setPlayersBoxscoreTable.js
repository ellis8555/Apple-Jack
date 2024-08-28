import sortGroupedStats from "../../../misc/sorting/sort";
import playersMAP from "../../../var_lib/maps/players/playersMAP";

let playersTable = [
    "Name",
    "Goals",
    "Assists",
    "Points",
    "Kicks",
    "Passes",
    "ShotsOnGoal",
    "OwnGoals",
  ];
  let fieldsLength = playersTable.length;

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
      if (playersTable[i] == sortBy) {
        playersData +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          ` class="w3-orange">` +
          playersTable[i] +
          "</th>";
      } else {
        playersData +=
          `<th data-field-name=` + //data-fieldNames required for mobile layout
          playersTable[i] +
          " >" +
          playersTable[i] +
          "</th>";
      }
    }
    playersData += "</tr></thead>";
    // end of html table header fields row
    thisGamesPlayerStatMAPS.forEach((item) => {
      // table data begins for each field
      playersData += "<tr>";
      for (let j = 0; j < fieldsLength; j++) {
        if (playersTable[j] == sortBy) {
          playersData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            ` class="w3-yellow">` + // add yellow background for sorted column points
            item.get(playersTable[j]) +
            "</td>";
        } else if (playersTable[j] == "Name") {
          if (
            thisGamesHomeTeamPlayerNames.includes(
              playersMAP.get(+item.get("PlayerID"))
            )
          ) {
            playersData +=
              `<td data-field-name=` + //data-fieldNames required for mobile layout
              playersTable[j] +
              ` style="background-color:${thisGamesHomeTeamColor};color:#fff">` +
              playersMAP.get(+item.get("PlayerID")) +
              "</td>";
          } else {
            playersData +=
              `<td data-field-name=` + //data-fieldNames required for mobile layout
              playersTable[j] +
              ` style="background-color:${thisGamesAwayTeamColor};color:#fff">` +
              playersMAP.get(+item.get("PlayerID")) +
              "</td>";
          }
        } else {
          playersData +=
            `<td data-field-name=` + //data-fieldNames required for mobile layout
            playersTable[j] +
            " >" +
            item.get(playersTable[j]) +
            "</td>";
        }
      }

      playersData += "</tr>";
    });
    playersData += `</table>`;
    playerStatsContainer.innerHTML = playersData;

function addEventListeners() {
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

  addEventListeners();

// Throttle function to limit how often a function can be called
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Your resize listener function
function handleResize() {
  let playerStatsContainer = document.querySelector("#boxscorePlayerStats");
  if (playerStatsContainer) {
    addEventListeners()
  }
}

// Throttled version of the resize listener
const throttledResize = throttle(handleResize, 400); // Adjust the limit (in milliseconds) as needed

// Add or remove the resize event listener based on the container's existence
function updateResizeListener() {
  let playerStatsContainer = document.querySelector("#boxscorePlayerStats");
  if (playerStatsContainer) {
    window.addEventListener('resize', throttledResize);
  } else {
    window.removeEventListener('resize', throttledResize);
  }
}

// Call the function to update the resize listener
updateResizeListener();

}

export default setPlayersBoxscoreTable;
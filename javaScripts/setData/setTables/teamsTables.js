import { TeamStats } from "../createTeams.js";
import { teamsMAP } from "../../importJSON/masterVars.js";
import sortGroupedStats from "../../sort.js";
import { setTableListeners } from "../../oldDesign/hax94Listeners.js";
import {
  // seasonMode,
  // teamStatsFieldsAbbreviated,
  // teamStatsFieldNamesMAP,
  // teamStatsFields,
  //   allTimeStatsArray,
  //   allTimeStatsMAPS,
  groupedAllTimeTeamStats,
  //   statsType,
} from "../../classFiles/teamStats.js";

// END OF IMPORTS

// SET FIELDS FOR TABLES
let homePageFields = ["Team", "GP", "Wins", "Losses", "Draws", "Points"];
let fullTable = [
  "Team",
  "GP",
  "Wins",
  "Losses",
  "Draws",
  "Points",
  "GF",
  "GFA",
  "GA",
  "GAA",
  "GD",
];
// PLACE ARRAYS IN A MAP IN ORDER FOR "sortTable" METHOD TO PROPERLY RETRIEVE DATA ATTRIBUTES
let tableFields = new Map();
tableFields.set("fullTable", fullTable).set("homePageFields", homePageFields);

let tableDataSource = new Map();
tableDataSource
  .set(
    "TeamStats.groupTeamsAllTimeSeasonStats",
    TeamStats.groupTeamsAllTimeSeasonStats
  )
  .set(
    "TeamStats.groupTeamsAllTimePlayoffStats",
    TeamStats.groupTeamsAllTimePlayoffStats
  );

// TH,TD OF TABLE ONCLICK SORTING
export function sortTable(event) {
  let caption = document.querySelector("table caption > h1");
  let tableName = caption.textContent;
  let dataName = event.target.dataset.dataSource;
  let data = tableDataSource.get(dataName);
  let color = "w3-yellow";
  let sortBy = event.target.dataset.fieldName;
  let arrayName = event.target.dataset.arraySource;
  let arraySource = tableFields.get(arrayName);
  createTable(tableName, dataName, data, color, sortBy, arrayName, arraySource);
  setTableListeners();
}

// TABLE DESIGN

export function createTable(
  tableName,
  dataSourceName,
  dataSource,
  color,
  sortBy = "Points",
  fieldsArrayName,
  ...fieldsArray
) {
  sortGroupedStats(dataSource, sortBy);
  let tableHeaders = fieldsArray[0];
  let fieldsLength = fieldsArray[0].length; // named array of fields previously made
  let browserWidth = window.innerWidth;
  let playerStats = "";
  // html table begin
  playerStats = "<table>";
  // html table caption
  playerStats += `<caption><h1>${tableName}</h1></caption>`;
  // html table thead
  playerStats += "<thead><tr>";
  for (let i = 0; i < fieldsLength; i++) {
    playerStats +=
      `<th data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
      tableHeaders[i] +
      " >" +
      tableHeaders[i] +
      "</th>";
  }
  playerStats += "</tr></thead>";
  // end of html table header fields row

  dataSource.forEach((item) => {
    // table data begins for each field
    playerStats += "<tr>";
    if (browserWidth < 982) {
      for (let j = 0; j < fieldsLength; j++) {
        if (tableHeaders[j] == sortBy) {
          playerStats +=
            `<td data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} class=${color} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(tableHeaders[j]) +
            "</td>";
        } else {
          playerStats +=
            `<td  data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(tableHeaders[j]) +
            "</td>";
        }
      }
      playerStats += "</tr>";
    } else {
      for (let j = 0; j < fieldsLength; j++) {
        if (tableHeaders[j] == sortBy) {
          playerStats +=
            `<td data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} class=${color} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(tableHeaders[j]) +
            "</td>";
        } else {
          playerStats +=
            `<td data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(tableHeaders[j]) +
            "</td>";
        }
      }
      playerStats += "</tr>";
    }
    playerStats += "</tr>";
  });

  // html table ends
  playerStats += "</table>";

  // display table on web page
  let x = document.getElementById("tablesDiv");
  x.innerHTML = playerStats;
}

// END TABLE DESIGN

// TABLE CREATION
// update the tableDataSource MAP up above!!
// be sure to add "setTableListeners" function needed for sidebar link. resets listeners to table

// S01 regular season
export function setHomeTable() {
  createTable(
    "S01 Regular Season",
    "TeamStats.groupTeamsAllTimeSeasonStats",
    TeamStats.groupTeamsAllTimeSeasonStats,
    "w3-yellow",
    "Points",
    "fullTable",
    fullTable
  );
  setTableListeners();
}

// S01 Playoff
export function setPlayoffTable() {
  createTable(
    "S01 Playoffs",
    "TeamStats.groupTeamsAllTimePlayoffStats",
    TeamStats.groupTeamsAllTimePlayoffStats,
    "w3-yellow",
    "Points",
    "fullTable",
    fullTable
  );
  setTableListeners();
}

setHomeTable();

// END TABLE CREATION

import { TeamStats } from "../createTeams.js";
import { teamsMAP } from "../../importJSON/masterVars.js";
import sortGroupedStats from "../../sort.js";
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
import print from "../../print.js";

// END OF IMPORTS

// SET FIELDS FOR TABLES
let finalStandings = ["GP", "Wins", "Losses", "Draws", "Points"];
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

// SORTING OF TABLES BEGIN
// sorts are using imported function
// this sorts the all time MAPS by entered field marked below
for (let i = 0; i < groupedAllTimeTeamStats.length; i++) {
  // groupedAllTimeTeamStats is destructured naming array
  sortGroupedStats(
    TeamStats[groupedAllTimeTeamStats[i]],
    "Points" // change sort category here
  );
}

// END SORTING

// TABLE CREATION

function createTable(
  tableName,
  dataSource,
  color,
  sortBy = "Points",
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
      `<th data-field-name=` + //data-fieldNames required for mobile layout
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
      playerStats += "<tr>";
      for (let j = 0; j < fieldsLength; j++) {
        if (tableHeaders[j] == sortBy) {
          playerStats +=
            `<td  class=${color} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(ieldsfieldsArraye[j]) +
            "</td>";
        } else {
          playerStats +=
            `<td  data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(tableHeaders[j]) +
            "</td>";
        }
      }
      playerStats += "</tr>";
    } else {
      playerStats += "<tr>";
      for (let j = 0; j < fieldsLength; j++) {
        if (tableHeaders[j] == sortBy) {
          playerStats +=
            `<td class=${color} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >" +
            item.get(tableHeaders[j]) +
            "</td>";
        } else {
          playerStats +=
            "<td data-field-name=" + //data-fieldNames required for mobile layout
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

// END TABLE CREATION
// CONSOLE LOG

print("Team stats: ");

createTable(
  "Season 1 Standings",
  TeamStats.groupTeamsAllTimeSeasonStats,
  "w3-yellow",
  "Points",
  fullTable
);

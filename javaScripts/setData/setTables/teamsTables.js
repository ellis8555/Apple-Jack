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

// SORTING OF TABLES BEGIN
// sorts are using imported function
// this sorts the all time MAPS by entered field marked below
for (let i = 0; i < groupedAllTimeTeamStats.length; i++) {
  // groupedAllTimeTeamStats is destructured naming array
  sortGroupedStats(
    TeamStats[groupedAllTimeTeamStats[i]],
    "Wins" // change sort category here
  );
}

// END SORTING

// TABLE CREATION

let seasonTable = "groupTeamsSeason1SeasonStats";

function setTable(dataFieldName, elmName, color, jsonObject, tableName) {
  let selectedField = dataFieldName;
  if (!selectedField) {
    let selectedField = "Points";
    let browserWidth = window.innerWidth;
    let playerStats = "";
    //let browserWidth = window.innerWidth; // enables table to be displayed in mobile view
    playerStats =
      "<table>" + `<caption><h1>${tableName}</h1></caption>` + "<thead><tr>";
    // get column fields from first element in the array of player objects
    let fields = finalStandings;

    // construct field headers in <th> tags
    let fieldLength = fields.length;
    for (let i = 0; i < fieldLength; i++) {
      playerStats +=
        `<th onclick='${setTable}(this)' data-field-name=` + //data-fieldNames required for mobile layout
        fields[i] +
        " >" +
        fields[i] +
        "</th>";
    }

    playerStats += "</tr></thead>";

    //end of field headers and beginning of data for each field

    let participantCount = jsonObject.length; // counts all player objects returning all players
    let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
    if (browserWidth < 982) {
      for (let i = 0; i < participantCount; i++) {
        playerStats += "<tr>";
        for (let j = 0; j < fieldLength; j++) {
          if (fieldsArray[j] == selectedField) {
            playerStats +=
              `<td onclick='${setTable}(this)' class=${color} data-field-name=` + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          } else {
            playerStats +=
              `<td onclick='${setTable}(this)' data-field-name=` + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          }
        }
        playerStats += "</tr>";
      }
    } else {
      for (let i = 0; i < participantCount; i++) {
        playerStats += "<tr>";
        for (let j = 0; j < fieldLength; j++) {
          if (fieldsArray[j] == selectedField) {
            playerStats +=
              `<td class=${color} data-field-name=` + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          } else {
            playerStats +=
              "<td data-field-name=" + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          }
        }
        playerStats += "</tr>";
      }
    }

    playerStats += "</table>";
    //insert table HTML into selected element
    document.getElementById(elmName).innerHTML = playerStats;
  } else {
    let thisSelectedField = selectedField.dataset.fieldName;
    let playerStats = "";
    let browserWidth = window.innerWidth; // enables table to be displayed in mobile view
    //set sorting function listening in on clicks on <th> elements and set as inline function
    //dataset retrieves info from html -data attribute
    let sortedBy = (a, b) => b[thisSelectedField] - a[thisSelectedField];
    jsonObject.sort(sortedBy);
    //end of sorting function

    playerStats =
      "<table>" + `<caption><h1>${tableName}</h1></caption>` + "<thead><tr>";
    // get column fields from first element in the array of player objects
    let fields = finalStandings;

    // construct field headers in <th> tags
    let fieldLength = fields.length;
    for (let i = 0; i < fieldLength; i++) {
      playerStats +=
        `<th onclick='${setTable}(this)' data-field-name=` + //data-fieldNames required for mobile layout
        fields[i] +
        " >" +
        fields[i] +
        "</th>";
    }

    playerStats += "</tr></thead>";

    //end of field headers and beginning of data for each field

    let participantCount = jsonObject.length; // counts all player objects returning all players
    let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
    if (browserWidth < 982) {
      for (let i = 0; i < participantCount; i++) {
        playerStats += "<tr>";
        for (let j = 0; j < fieldLength; j++) {
          if (fieldsArray[j] == thisSelectedField) {
            playerStats +=
              `<td onclick='${setTable}(this)' class='w3-yellow' data-field-name=` + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          } else {
            playerStats +=
              `<td onclick='${setTable}(this)' data-field-name=` + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          }
        }
        playerStats += "</tr>";
      }
    } else {
      for (let i = 0; i < participantCount; i++) {
        playerStats += "<tr>";
        for (let j = 0; j < fieldLength; j++) {
          if (fieldsArray[j] == thisSelectedField) {
            playerStats +=
              `<td class=${color} data-field-name=` + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          } else {
            playerStats +=
              "<td data-field-name=" + //data-fieldNames required for mobile layout
              fieldsArray[j] +
              " >" +
              jsonObject[i][fieldsArray[j]] +
              "</td>";
          }
        }
        playerStats += "</tr>";
      }
    }

    playerStats += "</table>";
    //insert table HTML into selected element
    document.getElementById(elmName).innerHTML = playerStats;
  }
  //end of table
}

// END TABLE CREATION
// CONSOLE LOG

print("Team stats: ");
print(teamsMAP);
// for (let i = 1; i <= teamsMAP.size; i++) {
//   print(TeamStats.allTeamStats[teamsMAP.get(i)].allTimeSeasonStatsMAP);
// }

// print(TeamStats.groupTeamsAllTimeSeasonStats);
// let playerStats = "";
// let fields = [
//   "Team",
//   "GP",
//   "Wins",
//   "Losses",
//   "Draws",
//   "Points",
//   "GF",
//   "GFA",
//   "GA",
//   "GAA",
//   "GD",
// ];
// let fieldLength = fields.length;
// playerStats = "<table>";
// playerStats += "<caption>Season Standings</caption>";
// playerStats += "<thead><tr>";
// for (let i = 0; i < fieldLength; i++) {
//   playerStats += "<th>" + fields[i] + "</th>";
// }
// playerStats += "</tr></thead>";

// TeamStats.groupTeamsAllTimeSeasonStats.forEach((item) => {
//   playerStats += "<tr>";
//   for (let i = 0; i < fieldLength; i++) {
//     playerStats += "<td>" + item.get(fields[i]) + "</td>";
//   }
//   playerStats += "</tr>";
// });
// playerStats += "</table>";

// let x = document.getElementById("test");
// x.innerHTML = playerStats;

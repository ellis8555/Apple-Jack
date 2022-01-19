import { TeamStats } from "../createTeams.js";
import { teamsMAP } from "../../importJSON/masterVars.js";
import { sortGroupedStats } from "../../sort.js";
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

// CONSOLE LOG

print("Team stats: ");
print(teamsMAP);
// for (let i = 1; i <= teamsMAP.size; i++) {
//   print(TeamStats.allTeamStats[teamsMAP.get(i)].allTimeSeasonStatsMAP);
// }

print(TeamStats.groupTeamsAllTimeSeasonStats);
let playerStats = "";
let fields = [
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
let fieldLength = fields.length;
playerStats = "<table>";
playerStats += "<caption>Season Standings</caption>";
playerStats += "<thead><tr>";
for (let i = 0; i < fieldLength; i++) {
  playerStats += "<th>" + fields[i] + "</th>";
}
playerStats += "</tr></thead>";

TeamStats.groupTeamsAllTimeSeasonStats.forEach((item) => {
  playerStats += "<tr>";
  for (let i = 0; i < fieldLength; i++) {
    playerStats += "<td>" + item.get(fields[i]) + "</td>";
  }
  playerStats += "</tr>";
});
playerStats += "</table>";

let x = document.getElementById("test");
x.innerHTML = playerStats;

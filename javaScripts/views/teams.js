import { TeamStats } from "../class/teamStats.js";

import {
  seasonMode,
  teamStatsFieldsAbbreviated,
  teamStatsFieldNamesMAP,
  teamStatsFields,
  allTimeStatsArray,
  allTimeStatsMAPS,
  groupedAllTimeTeamStats,
  statsType,
} from "../class/teamStats.js";

import {
  teamsLength,
  playersLength,
  gameTypeLength,
  teamPlayersLength,
  gameResultsLength,
  seasonCountLength,
  gamePlayerStatsLength,
} from "../masterVars.js";
// maps
import { teamsMAP, playersMAP, gameTypeMAP } from "../masterVars.js";
import { seasonCount } from "../masterVars.js";

import print from "../print.js";

// create proper arrays and MAPS for when more than one season is played
TeamStats.setPerSeasonAllTimeContainers(seasonCountLength);

// INSTANTIATE team objects
// create objects for each team
for (let i = 1; i <= teamsMAP.size; i++) {
  TeamStats.allTeamStats[teamsMAP.get(i)] = new TeamStats(teamsMAP.get(i));

  // set arrays with each teams game data
  TeamStats.allTeamStats[teamsMAP.get(i)].setTeamsAllTimeStats(
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats"
  );

  // set grouped all time class MAPS data for each team
  for (let j = 0; j < allTimeStatsArray.length; j++) {
    TeamStats.allTeamStats[teamsMAP.get(i)].setTeamsAllTimeStatsMAPS(
      allTimeStatsArray[j],
      allTimeStatsMAPS[j]
    );
  }
}

// END of team object creation

TeamStats.setGroupedAllTimeArrays(); // populates the class arrays with team MAPS grouping for display of data in tabular form

// loop that fills each team's seasons combined stats array per each season number
if (seasonCount.length > 1) {
  //array for combined season and playoffs
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 0; j < seasonCountLength; j++) {
      TeamStats.allTeamStats[teamsMAP.get(i)][
        "teamsSeason" + seasonCount[j] + "CombinedStats"
      ].push(
        TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
          (item) => item.SeasonNumber == seasonCount[j]
        )
      );
    }
  }
}

// loop that fills each team's seasons regular season and playoff stats array
if (seasonCount.length > 1) {
  // arrays for regular season and playoffs per each season
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 0; j < seasonCountLength; j++) {
      // teamsSeason # SeasonStats poulation
      TeamStats.allTeamStats[teamsMAP.get(i)][
        "teamsSeason" + seasonCount[j] + "SeasonStats"
      ].push(
        TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
          // filter the teams all time array
          (item) =>
            item.SeasonNumber == seasonCount[j] &&
            gameTypeMAP.get(Number(item.GameTypeID)) == "Season"
        )
      );
      // teamsSeason # PlayoffStats poulation
      TeamStats.allTeamStats[teamsMAP.get(i)][
        "teamsSeason" + seasonCount[j] + "PlayoffStats"
      ].push(
        TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
          // filter the teams all time array
          (item) =>
            item.SeasonNumber == seasonCount[j] &&
            gameTypeMAP.get(Number(item.GameTypeID)) == "Playoff"
        )
      );
    }
  }
}

// loop that fills each teams individual seasons MAPS

if (seasonCount.length > 1) {
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 1; j <= seasonCountLength; j++) {
      for (let k = 0; k < statsType.length; k++) {
        TeamStats.allTeamStats[
          teamsMAP.get(i)
        ].setTeamsIndividualSeasonsStatsMAPS(
          `teamsSeason${j}${statsType[k]}`, // input array
          `teamsSeason${j}${statsType[k]}MAP`, // output MAP
          j // season number
        );
      }
    }
  }
}
// SORTING FUNCTION
//sort function for sorting class' grouped arrays containing all team's MAPS

function sortGroupedTeamStats(inputArray, category) {
  inputArray.sort((a, b) => b.get(category) - a.get(category));
}

// this sorts the all time MAPS by entered field marked below
for (let i = 0; i < groupedAllTimeTeamStats.length; i++) {
  // groupedAllTimeTeamStats is destructured naming array
  sortGroupedTeamStats(
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

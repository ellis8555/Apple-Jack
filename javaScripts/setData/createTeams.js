import { TeamStats } from "../classFiles/teamStats.js";

import {
  // seasonMode,
  // teamStatsFieldsAbbreviated,
  // teamStatsFieldNamesMAP,
  // teamStatsFields,
  allTimeStatsArray,
  allTimeStatsMAPS,
  groupedAllTimeTeamStats,
  statsType,
} from "../classFiles/teamStats.js";

import {
  // teamsLength,
  // playersLength,
  // gameTypeLength,
  // teamPlayersLength,
  // gameResultsLength,
  seasonCountLength,
  // gamePlayerStatsLength,
} from "../../json/masterVars.js";
// maps
import { teamsMAP, playersMAP, gameTypeMAP } from "../../json/masterVars.js";
import { seasonCount } from "../../json/masterVars.js";

// TeamStats is the class for team object creation
// allTeamStats (object) is the container holding each teams' object
// TeamStats.allTeamStats(<teamName>) is how to get within any teams' own object
// --------------------
//    "groupTeamsAllTimeStats", "groupTeamsAllTimeSeasonStats",
// "groupTeamsAllTimePlayoffStats", are static arrays for the class which hold each teams'
// MAPS that have each teams' all time stats reduced and ready for table display
// --------------------
// "groupTeamsSeason<seasonNumber>" followed either <CombinedStats>,<SeasonStats> or <PlayoffStats>
// are static arrays for the class which hold each teams' MAPS
// that have each teams' stats reduced per each season which is ready for table display
// --------------------
// sortGroupedTeamStats(<arrayName>, <fieldName>) is function to sort the static class arrays containing
// each teams' MAPS by category.
// SORT EXAMPLE
// sortGroupedTeamStats(
//   TeamStats[groupedAllTimeTeamStats[i]], // [groupedAllTimeTeamStats[i]] is a destructed array variable
//   "Losses" // change sort category here
// );

// create proper arrays for holding team MAPS for when more than one season is played
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

// loop that fills static arrays containing per season team stats for tabular data as per season

if (seasonCount.length > 1) {
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 1; j <= seasonCountLength; j++) {
      for (let k = 0; k < statsType.length; k++) {
        TeamStats["groupTeamsSeason" + j + statsType[k]].push(
          TeamStats.allTeamStats[teamsMAP.get(i)][
            "teamsSeason" + j + statsType[k] + "MAP"
          ]
        );
      }
    }
  }
}

// TESTING

// let x = TeamStats.allTeamStats;
// console.log(x);

// EXPORTS

export { TeamStats };

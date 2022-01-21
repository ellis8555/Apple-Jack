import { IndividualPlayerStats } from "../createPlayers.js";
import sortGroupedStats from "../../sort.js";
import {
  //   seasonMode,
  //   playerStatsFields,
  //   allTimeStatsArray,
  //   allTimeStatsMAPS,
  groupedAllTimePlayerStats,
  //   allTimeMapNames,
  perSeasonCats,
  //   perSeasonCatMAPS,
} from "../createPlayers.js";
import {
  // teamsLength,
  // playersLength,
  // gameTypeLength,
  // teamPlayersLength,
  //   gameResultsLength,
  seasonCountLength,
  // gamePlayerStatsLength,
} from "../../importJSON/masterVars.js";
import { seasonCount } from "../../importJSON/masterVars.js";

// sorts are using imported function
//sort all time tables

for (let i = 0; i < groupedAllTimePlayerStats.length; i++) {
  // groupedAllTimePlayerStats is destructured naming array
  sortGroupedStats(
    IndividualPlayerStats[groupedAllTimePlayerStats[i]],
    "Points" // change sort category here
  );
}

// sort per season tables

if (seasonCountLength > 1) {
  for (let j = 0; j < seasonCountLength; j++) {
    for (let k = 0; k < perSeasonCats.length; k++) {
      sortGroupedStats(
        IndividualPlayerStats[
          "groupPlayersSeason" + seasonCount[j] + perSeasonCats[k]
        ],
        "Points" // change sort category here
      );
    }
  }
}

// console out

// console.log("All time stats: ");
// console.log(IndividualPlayerStats.groupPlayersAllTimeStats);
// console.log(IndividualPlayerStats.allPlayersStats["Ellis"]);

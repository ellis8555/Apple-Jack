import { IndividualPlayerStats } from "../classFiles/individualPlayerStats.js";

import {
  teams,
  // players,
  // gameType,
  // teamPlayers,
  gameResults,
  // gamePlayerStats,
} from "../../json/masterVars.js";
// lengths of the above arrays
import {
  // teamsLength,
  // playersLength,
  // gameTypeLength,
  // teamPlayersLength,
  gameResultsLength,
  seasonCountLength,
  // gamePlayerStatsLength,
} from "../../json/masterVars.js";
// maps
import { teamsMAP, playersMAP, gameTypeMAP } from "../../json/masterVars.js";
import { seasonCount } from "../../json/masterVars.js";

// IndividualPlayerStats is the class each players' object creation
// allPLayersStats (object) is the container holding each players' object
// IndividualPlayerStats.allPlayersStats(<playerName>) is how to get within any players' own object
// --------------------
//    "groupPlayersAllTimeStats", "groupPlayersAllTimeSeasonStats",
// "groupPlayersAllTimePlayoffStats", are static arrays for the class which hold each players'
// MAPS that have each players' all time stats reduced and ready for table display
// --------------------
//    "groupPlayersSeason<number> followed with either <CombinedStats>,<SeasonStats> or <PlayoffStats>,
// are static arrays for the class which hold each players'
// MAPS that have each players' all time stats reduced and ready for table display
// --------------------
// Each players' own object contains various arrays and MAPS that are both "allTime" and "per season"
// which the array holds each record that the player is directly in and MAPS which reduce the arrays
// into single totals ready to be displayed in table form
// --------------------
// sortGroupedPlayerStats(<arrayName>, <fieldName>) is function to sort the static class arrays containing
// each players' MAPS by category.
// SORT EXAMPLE
// sortGroupedPlayerStats(
//   IndividualPlayerStats[groupedAllTimePlayerStats[i]],
//   "Points" // change sort category here
// );

// Vars for destructuring //

let supportVars = {
  seasonMode: ["Season", "Playoff"],
  playerStatsFields: [
    "Assists",
    "Goals",
    "Points",
    "Kicks",
    "Passes",
    "ShotsOnGoal",
    "OwnGoals",
  ],
  allTimeStatsArray: [
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats",
  ],
  allTimeStatsMAPS: [
    "allTimeStatsMAP",
    "allTimeSeasonStatsMAP",
    "allTimePlayoffStatsMAP",
  ],
  groupedAllTimePlayerStats: [
    "groupPlayersAllTimeStats",
    "groupPlayersAllTimeSeasonStats",
    "groupPlayersAllTimePlayoffStats",
  ],
  allTimeMapNames: [
    "groupPlayersAllTimeStatsMAP",
    "groupPlayersAllTimeSeasonStatsMAP",
    "groupPlayersAllTimePlayoffStatsMAP",
  ],
  perSeasonCats: ["CombinedStats", "SeasonStats", "PlayoffStats"],
  perSeasonCatMAPS: ["CombinedStatsMAP", "SeasonStatsMAP", "PlayoffStatsMAP"],
};

export let {
  seasonMode,
  playerStatsFields,
  allTimeStatsArray,
  allTimeStatsMAPS,
  groupedAllTimePlayerStats,
  allTimeMapNames,
  perSeasonCats,
  perSeasonCatMAPS,
} = supportVars;

// instantiating the class and all related objects

IndividualPlayerStats.setPerSeasonAllTimeContainers(seasonCountLength);

for (let i = 1; i <= playersMAP.size; i++) {
  IndividualPlayerStats.allPlayersStats[playersMAP.get(i)] =
    new IndividualPlayerStats(playersMAP.get(i));

  IndividualPlayerStats.allPlayersStats[
    playersMAP.get(i)
  ].setPlayersAllTimeStats(
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats"
  );
}

// all time MAPS for each player

for (let i = 1; i <= playersMAP.size; i++) {
  for (let j = 0; j < allTimeStatsArray.length; j++) {
    for (let k = 0; k < playerStatsFields.length; k++) {
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].set(
        playerStatsFields[k],
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          allTimeStatsArray[j]
        ]
          .map((item) => Number(item[playerStatsFields[k]]))
          .reduce((current, adjusted) => current + adjusted, 0)
      );
    }
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
      allTimeStatsMAPS[j]
    ].set(
      "GP",
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsArray[j]
      ].length
    );
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
      allTimeStatsMAPS[j]
    ].set(
      "Points",
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].get("Assists") +
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          allTimeStatsMAPS[j]
        ].get("Goals")
    );
  }
}
// loop that fills each players seasons stats per each season
// array for specific season, that seasons playoff and also combined season and playoffs

// if (seasonCount.length > 1) {
//array for combined season and playoffs

for (let i = 1; i <= playersMAP.size; i++) {
  let playersSeasonAppearances =
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
  for (let j = 0; j < playersSeasonAppearances.length; j++) {
    IndividualPlayerStats.allPlayersStats[
      playersMAP.get(i)
    ].allTimeStats.forEach((item) => {
      for (let k = 0; k < gameResultsLength; k++) {
        if (
          item.GameID == gameResults[k].GameID &&
          gameResults[k].SeasonNumber == playersSeasonAppearances[j]
        )
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + playersSeasonAppearances[j] + "CombinedStats"
          ].push(item);
      }
    });
  }
}
//888888888888888888888888888888888888888888888888888888888888888888888
// for (let i = 1; i <= playersMAP.size; i++) {
//   for (let j = 0; j < seasonCount; j++) {
//     IndividualPlayerStats.allPlayersStats[
//       playersMAP.get(i)
//     ].allTimeStats.forEach((item) => {
//       for (let k = 0; k < gameResultsLength; k++) {
//         if (
//           item.GameID == gameResults[k].GameID &&
//           gameResults[k].SeasonNumber == seasonCount[j]
//         )
//           IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
//             "playersSeason" + seasonCount[j] + "CombinedStats"
//           ].push(item);
//       }
//     });
//   }
// }
//88888888888888888888888888888888888888888888888888888888888888888888
// array for specific for season and seperately playoff

for (let i = 1; i <= playersMAP.size; i++) {
  let playersSeasonAppearances =
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
  for (let j = 0; j < playersSeasonAppearances.length; j++) {
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
      "playersSeason" + playersSeasonAppearances[j] + "CombinedStats"
    ].forEach((item) => {
      for (let k = 0; k < gameResultsLength; k++) {
        if (
          item.GameID == gameResults[k].GameID &&
          gameResults[k].SeasonNumber == playersSeasonAppearances[j] &&
          gameTypeMAP.get(Number(gameResults[k].GameTypeID)) == "Playoff"
        )
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + playersSeasonAppearances[j] + "PlayoffStats"
          ].push(item);
        if (
          item.GameID == gameResults[k].GameID &&
          gameResults[k].SeasonNumber == playersSeasonAppearances[j] &&
          gameTypeMAP.get(Number(gameResults[k].GameTypeID)) == "Season"
        )
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + playersSeasonAppearances[j] + "SeasonStats"
          ].push(item);
      }
    });
  }
}

//////////////////////Individual player season MAPS
for (let i = 1; i <= playersMAP.size; i++) {
  let seasonsPlayedIn =
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
  for (let j = 0; j < seasonsPlayedIn.length; j++) {
    for (let l = 0; l < perSeasonCatMAPS.length; l++) {
      for (let k = 0; k < playerStatsFields.length; k++) {
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].set(
          playerStatsFields[k],
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonsPlayedIn[j] + perSeasonCats[l]
          ]
            .map((item) => Number(item[playerStatsFields[k]]))
            .reduce((current, adjusted) => current + adjusted, 0)
        );
      }
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
      ].set(
        "GP",
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + [perSeasonCats[l]]
        ].length
      );
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
      ].set(
        "Points",
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].get("Assists") +
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
          ].get("Goals")
      );
    }
  }
}
// } // end of if season is greater than 1
////////////BEGIN of populating arrays for tabular style data. All time and per season with varying modes. (alltime, season and playoffs)
// copying allPlayerStats objects contents into array form in order to use array functionality
for (let i = 1; i <= playersMAP.size; i++) {
  IndividualPlayerStats.playerStatsProfile.push(
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)]
  );
}

// seperating playerStatsProfile array (each player) into allTime, Season and Playoff arrays
IndividualPlayerStats.playerStatsProfile.forEach((item) => {
  for (let i = 0; i < groupedAllTimePlayerStats.length; i++) {
    item[allTimeStatsMAPS[i]].set("Name", item.name); // MAP needs name to associate who owns the stats
    IndividualPlayerStats[groupedAllTimePlayerStats[i]].push(
      item[allTimeStatsMAPS[i]]
    );
  }
});

// seperating playerStatsProfile array (each player) into per each Season stats ready for tabular data
if (seasonCount.length > 1) {
  for (let i = 1; i <= playersMAP.size; i++) {
    let seasonsPlayedIn =
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
    for (let j = 0; j < seasonsPlayedIn.length; j++) {
      for (let k = 0; k < perSeasonCats.length; k++) {
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + [perSeasonCatMAPS[k]]
        ].set("Name", playersMAP.get(i));
        IndividualPlayerStats[
          "groupPlayersSeason" + seasonsPlayedIn[j] + [perSeasonCats[k]]
        ].push(
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonsPlayedIn[j] + [perSeasonCatMAPS[k]]
          ]
        );
      }
    }
  }
}

// TESTING

// EXPORTS

export { IndividualPlayerStats };

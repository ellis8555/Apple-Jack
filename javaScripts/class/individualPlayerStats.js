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

// destructured vars that are both in this class file and teamStats.js class file
// arrays from masterRecords.js
import {
  teams,
  players,
  gameType,
  teamPlayers,
  gameResults,
  gamePlayerStats,
} from "../masterVars.js";
// lengths of the above arrays
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

// End of destructured vars //

export class IndividualPlayerStats {
  constructor(name) {
    // players name
    this.name = name;
    // all time player stats per object (player)
    this.allTimeStats = []; // collects from gamePlayerStats JSON
    this.allTimeSeasonStats = []; // gameResults JSON filtered to seasonType is "Season"
    this.allTimePlayoffStats = []; // gameResults JSON filtered to seasonType is "Playoff"
    this.allTimeStatsMAP = new Map();
    this.allTimeSeasonStatsMAP = new Map();
    this.allTimePlayoffStatsMAP = new Map();
    if (seasonCountLength > 1) {
      seasonCount.forEach((item) => {
        this["playersSeason" + item + "CombinedStats"] = [];
        this["playersSeason" + item + "SeasonStats"] = [];
        this["playersSeason" + item + "PlayoffStats"] = [];
        this["playersSeason" + item + "CombinedStatsMAP"] = new Map();
        this["playersSeason" + item + "SeasonStatsMAP"] = new Map();
        this["playersSeason" + item + "PlayoffStatsMAP"] = new Map();
      });
    }
  }

  // static properties and methods

  static allPlayersStats = {}; // individual players instances of this class placed here
  static playerStatsProfile = []; // same as above but in array form

  // these arrays contain MAPS for each players all time totals ready for tabular display
  static groupPlayersAllTimeStats = [];
  static groupPlayersAllTimeSeasonStats = [];
  static groupPlayersAllTimePlayoffStats = [];

  static setPerSeasonAllTimeContainers(seasonCountLength) {
    if (seasonCountLength > 1) {
      seasonCount.forEach((item) => {
        this["groupPlayersSeason" + item + "CombinedStats"] = [];
        this["groupPlayersSeason" + item + "SeasonStats"] = [];
        this["groupPlayersSeason" + item + "PlayoffStats"] = [];
      });
    }
  }

  // set player all time stats arrays

  setPlayersAllTimeStats(
    allTimeArray,
    allTimeSeasonArray,
    allTimePlayoffArray
  ) {
    // fills allTimeStats[]/seasonStats[]/playoff[]
    gamePlayerStats.forEach((item) => {
      if (playersMAP.get(Number(item.PlayerID)) == this.name) {
        this[allTimeArray].push(item);
      }
    });

    this[allTimeArray].forEach((item) => {
      for (let i = 0; i < gameResultsLength; i++) {
        // gameResultsLength
        if (
          item.GameID == gameResults[i].GameID &&
          gameTypeMAP.get(Number(gameResults[i].GameTypeID)) == "Season"
        )
          this[allTimeSeasonArray].push(item);
        if (
          item.GameID == gameResults[i].GameID &&
          gameTypeMAP.get(Number(gameResults[i].GameTypeID)) == "Playoff"
        )
          this[allTimePlayoffArray].push(item);
      }
    });
  }
}

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

if (seasonCount.length > 1) {
  //array for combined season and playoffs
  for (let i = 1; i <= playersMAP.size; i++) {
    for (let j = 0; j < seasonCountLength; j++) {
      IndividualPlayerStats.allPlayersStats[
        playersMAP.get(i)
      ].allTimeStats.forEach((item) => {
        for (let k = 0; k < gameResultsLength; k++) {
          if (
            item.GameID == gameResults[k].GameID &&
            gameResults[k].SeasonNumber == seasonCount[j]
          )
            IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
              "playersSeason" + seasonCount[j] + "CombinedStats"
            ].push(item);
        }
      });
    }
  }

  // array for specific for season and seperately playoff

  for (let i = 1; i <= playersMAP.size; i++) {
    for (let j = 0; j < seasonCountLength; j++) {
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        "playersSeason" + seasonCount[j] + "CombinedStats"
      ].forEach((item) => {
        for (let k = 0; k < gameResultsLength; k++) {
          if (
            item.GameID == gameResults[k].GameID &&
            gameResults[k].SeasonNumber == seasonCount[j] &&
            gameTypeMAP.get(Number(gameResults[k].GameTypeID)) == "Playoff"
          )
            IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
              "playersSeason" + seasonCount[j] + "PlayoffStats"
            ].push(item);
          if (
            item.GameID == gameResults[k].GameID &&
            gameResults[k].SeasonNumber == seasonCount[j] &&
            gameTypeMAP.get(Number(gameResults[k].GameTypeID)) == "Season"
          )
            IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
              "playersSeason" + seasonCount[j] + "SeasonStats"
            ].push(item);
        }
      });
    }
  }

  // // //////////////////Individual player season MAPS

  for (let i = 1; i <= playersMAP.size; i++) {
    for (let j = 0; j < seasonCount.length; j++) {
      for (let l = 0; l < perSeasonCatMAPS.length; l++) {
        for (let k = 0; k < playerStatsFields.length; k++) {
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonCount[j] + perSeasonCatMAPS[l]
          ].set(
            playerStatsFields[k],
            IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
              "playersSeason" + seasonCount[j] + perSeasonCats[l]
            ]
              .map((item) => Number(item[playerStatsFields[k]]))
              .reduce((current, adjusted) => current + adjusted, 0)
          );
        }
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonCount[j] + perSeasonCatMAPS[l]
        ].set(
          "Points",
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonCount[j] + perSeasonCatMAPS[l]
          ].get("Assists") +
            IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
              "playersSeason" + seasonCount[j] + perSeasonCatMAPS[l]
            ].get("Goals")
        );
      }
    }
  }
} // end of if season is greater than 1

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
    for (let j = 0; j < seasonCountLength; j++) {
      for (let k = 0; k < perSeasonCats.length; k++) {
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonCount[j] + [perSeasonCatMAPS[k]]
        ].set("Name", playersMAP.get(i));
        IndividualPlayerStats[
          "groupPlayersSeason" + seasonCount[j] + [perSeasonCats[k]]
        ].push(
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonCount[j] + [perSeasonCatMAPS[k]]
          ]
        );
      }
    }
  }
}

//sort all time tables

function sortGroupedPlayerStats(inputArray, category) {
  inputArray.sort((a, b) => b.get(category) - a.get(category));
}

for (let i = 0; i < groupedAllTimePlayerStats.length; i++) {
  // groupedAllTimePlayerStats is destructured naming array
  sortGroupedPlayerStats(
    IndividualPlayerStats[groupedAllTimePlayerStats[i]],
    "Points" // change sort category here
  );
}

// sort per season tables

if (seasonCount.length > 1) {
  for (let j = 0; j < seasonCount.length; j++) {
    for (let k = 0; k < perSeasonCats.length; k++) {
      sortGroupedPlayerStats(
        IndividualPlayerStats[
          "groupPlayersSeason" + seasonCount[j] + perSeasonCats[k]
        ],
        "Points" // change sort category here
      );
    }
  }
}

// console out

//print("All time stats: ");
//print(IndividualPlayerStats.groupPlayersAllTimeStats);
// print(IndividualPlayerStats.allPlayersStats["Ellis"]);

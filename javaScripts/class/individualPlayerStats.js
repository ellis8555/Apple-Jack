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

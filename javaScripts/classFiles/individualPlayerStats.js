// destructured vars that are both in this class file and teamStats.js class file
// arrays from masterRecords.js
import {
  // teams,
  // players,
  // gameType,
  // teamPlayers,
  gameResults,
  gamePlayerStats,
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
import { playersMAP, gameTypeMAP } from "../../json/masterVars.js"; // teamsMAP not included
import { seasonCount } from "../../json/masterVars.js";

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

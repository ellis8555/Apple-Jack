import { IndividualPlayerStats } from "../createPlayers.js";
import { sortTable, createTable } from "./teamsTables.js";
import { setTableListeners } from "../../oldDesign/hax94Listeners.js";
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
// END OF IMPORTS

// SET FIELDS FOR TABLES
let playersTable = [
  "Name",
  "Goals",
  "Points",
  "Kicks",
  "Passes",
  "ShotsOngoal",
];

// PLACE ARRAYS IN A MAP IN ORDER FOR "sortTable" METHOD TO PROPERLY RETRIEVE DATA ATTRIBUTES
let tableFields = new Map();
tableFields.set("playersTable", playersTable);

let tableDataSource = new Map();
tableDataSource
  .set(
    "IndividualPlayerStats.groupPlayersAllTimeSeasonStats",
    IndividualPlayerStats.groupPlayersAllTimeSeasonStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersAllTimePlayoffStats",
    IndividualPlayerStats.groupPlayersAllTimePlayoffStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersAllTimeStats",
    IndividualPlayerStats.groupPlayersAllTimeStats
  );

// TABLE CREATION
// update the tableDataSource MAP up above!!
// be sure to add "setTableListeners" function needed for sidebar link. resets listeners to table

// S01 regular season
export function setPlayerS01Season() {
  createTable(
    "S01 Regular Season",
    "IndividualPlayerStats.groupPlayersAllTimeSeasonStats",
    IndividualPlayerStats.groupPlayersAllTimeSeasonStats,
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setTableListeners();
}

// S01 Playoff
export function setPlayerS01Playoff() {
  createTable(
    "S01 Playoffs",
    "IndividualPlayerStats.groupPlayersAllTimePlayoffStats",
    IndividualPlayerStats.groupPlayersAllTimePlayoffStats,
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setTableListeners();
}

// S01 Combined

export function setPlayerS01Combined() {
  createTable(
    "S01 All Points",
    "IndividualPlayerStats.groupPlayersAllTimeStats",
    IndividualPlayerStats.groupPlayersAllTimeStats,
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setTableListeners();
}

// console out

// console.log("All time stats: ");
// console.log(IndividualPlayerStats);
// console.log(IndividualPlayerStats.groupPlayersAllTimeStats);
// console.log(IndividualPlayerStats.allPlayersStats["Ellis"]);

import createTable from "./createTable";
import IndividualPlayerStats from "../setTables/createPlayer";
import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import currentSeason from "../var_lib/season/currentSeason";
import { playersTable } from "../../constants/consts/supportVars";
import setMainNavbar from "../layouts/navbar/setMainNavbar";

// modeDescriptor either 'Season', 'Playoff', or 'Combined' -- case sensitive!
// tableDescriptor either 'Regular Season', 'Playoffs', or 'All Stats' -- these are just table titles

export default function setPlayersAllTimeTable(seasonNumber, modeDescriptor = "", tableDescriptor) {
  // all time player stats contains possible 0 as season number

  const key = `groupPlayersAllTime${modeDescriptor}Stats`
  createTable(
    seasonNumber,
    `All Time ${tableDescriptor}`,
    `IndividualPlayerStats.groupPlayersAllTime${modeDescriptor}Stats`,
    IndividualPlayerStats[key],
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setMainNavbar(currentSeason)
  setTableListeners();
  }
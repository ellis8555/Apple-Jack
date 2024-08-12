import createTable from "./createTable";
import IndividualPlayerStats from "../setTables/createPlayer";
import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import currentSeason from "../var_lib/season/currentSeason";
import { playersTable } from "../../constants/consts/supportVars";
import setMainNavbar from "../layouts/setMainNavbar";

// modeDescriptor either 'Season', 'Playoff', or 'Combined' -- case sensitive!
// tableDescriptor either 'Regular Season', 'Playoffs', or 'All Stats' -- these are just table titles

export default function setPlayersFullTable(seasonNumber = currentSeason, modeDescriptor = "Season", tableDescriptor = "Regular Season") {

  const key = `groupPlayersSeason${seasonNumber}${modeDescriptor}Stats`
  createTable(
    seasonNumber,
    `S0${seasonNumber} ${tableDescriptor}`,
    `IndividualPlayerStats.groupPlayersSeason${seasonNumber}${modeDescriptor}Stats`,
    IndividualPlayerStats[key],
    "w3-yellow",
    "Points",
    "playersTable",
    playersTable
  );
  setMainNavbar(seasonNumber)
  setTableListeners();
  }
  
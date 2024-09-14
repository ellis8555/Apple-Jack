import createTable from "./createTable";
import IndividualPlayerStats from "../setTables/createPlayer";
import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import currentSeason from "../var_lib/season/currentSeason";
import { PLAYERS_TABLE } from "../../constants/consts/supportVars";
import setMainNavbar from "../layouts/navbar/setMainNavbar";
import { DEFENDING_CHAMPS } from "../../constants/consts/vars";
import setHeaderBanner from "../layouts/setHeaderBanner";
import COLORS from "../../constants/consts/colors";

// modeDescriptor either 'Season', 'Playoff', or 'Combined' -- case sensitive!
// tableDescriptor either 'Regular Season', 'Playoffs', or 'All Stats' -- these are just table titles

export default function setPlayersFullTable(seasonNumber = currentSeason, modeDescriptor = "Season", tableDescriptor = "Regular Season") {
  setHeaderBanner(DEFENDING_CHAMPS, currentSeason-1)
  setMainNavbar(seasonNumber)
  const key = `groupPlayersSeason${seasonNumber}${modeDescriptor}Stats`
  createTable(
    seasonNumber,
    `S0${seasonNumber} ${tableDescriptor}`,
    `IndividualPlayerStats.groupPlayersSeason${seasonNumber}${modeDescriptor}Stats`,
    IndividualPlayerStats[key],
    "w3-yellow",
    "Points",
    "PLAYERS_TABLE",
    PLAYERS_TABLE
  );
  document.body.style.backgroundColor = COLORS["w3-blue"]; 
  setTableListeners();
  }
  
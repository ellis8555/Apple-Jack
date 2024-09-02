import currentSeason from "../var_lib/season/currentSeason";
import TeamStats from "../classFiles/teams/teamStats"
import { homePageFieldsNoTies } from "../../constants/consts/supportVars";
import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import setMainNavbar from "../layouts/navbar/setMainNavbar";
import createTable from "./createTable";
import { DEFENDING_CHAMPS } from "../../constants/consts/vars";
import setHeaderBanner from "../layouts/setHeaderBanner";
import COLORS from "../../constants/consts/colors"
export default function setHomeTable() {
  const key = `groupTeamsSeason${currentSeason}SeasonStats`
    createTable(
      currentSeason,
      `Season ${currentSeason} Standings`,
      `TeamStats.groupTeamsSeason${currentSeason}SeasonStats`,
      TeamStats[key],
      "w3-yellow",
      "Points",
      "homePageFieldsNoTies",
      homePageFieldsNoTies
    );
    // reset background color when navigating back home from a teams layout page
    document.body.style.backgroundColor = COLORS['w3-blue'];
    setHeaderBanner(DEFENDING_CHAMPS, currentSeason-1)
    setMainNavbar(currentSeason);
    setTableListeners();
  }
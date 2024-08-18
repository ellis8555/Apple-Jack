import currentSeason from "../var_lib/season/currentSeason";
import TeamStats from "../classFiles/teamStats"
import { homePageFieldsNoTies } from "../../constants/consts/supportVars";
import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import setMainNavbar from "../layouts/navbar/setMainNavbar";
import createTable from "./createTable";
import { DEFENDING_CHAMPS, DEFENDING_CHAMPS_LOGO } from "../../constants/consts/vars";
import setHeaderBanner from "../layouts/setHeaderBanner";

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
    setTableListeners();
    setMainNavbar(currentSeason);
    // reset background color when navigating back home from a teams layout page
    document.body.style.backgroundColor = "#2196f3";
    setHeaderBanner(DEFENDING_CHAMPS_LOGO, DEFENDING_CHAMPS)
  }
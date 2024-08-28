import clearTablesDiv from "../../tables/clearTablesDiv";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv";
import getTablesDiv from "../../tables/getTablesDiv";
import eachTeamObjectMAP from "../../var_lib/maps/teams/eachTeamObjectMAP";
import setTeamsPageLayout from "../teamsPageLayout/setTeamsPageLayout";
import ColorsPageLayout from "./ColorsPageLayout";

export default function teamColorsPage(e) {
    clearTablesDiv();
    clearScoreboardDiv();
    getTablesDiv();
    let team = e.target.dataset.teamName;
    let seasonNum = e.target.dataset.seasonNum;
    let homeColorScheme = eachTeamObjectMAP.get(team)[`S0${seasonNum}Home`];
    let awayColorScheme = eachTeamObjectMAP.get(team)[`S0${seasonNum}Away`];

    tablesDiv.append(ColorsPageLayout(team, seasonNum, homeColorScheme, awayColorScheme))
    // create function to copy color red/blue scheme
  
    document
      .getElementById("teamColorsBackButton")
      .addEventListener("click", () => {setTeamsPageLayout(document.getElementById('teamColorsBackButton'))});
    // end back button
  
    function getColorScheme(e) {
      let scheme = e.target.dataset.colorScheme;
      navigator.clipboard.writeText(scheme);
    }
    // set listeners on newly created red/blue button elements
    let redBlueButtons = document.querySelectorAll("div[data-color-scheme]");
    redBlueButtons.forEach((item) =>
      item.addEventListener("click", getColorScheme)
    );
  }
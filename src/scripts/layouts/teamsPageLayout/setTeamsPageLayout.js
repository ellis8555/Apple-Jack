import clearTablesDiv from "../../tables/clearTablesDiv";
import getTablesDiv from "../../tables/getTablesDiv";
import closeSidebar from "../../sidebar/closeSidebar";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv";
import TeamStats from "../../classFiles/teams/teamStats";
import setHeaderBanner from "../setHeaderBanner";
import teamsColorMAP from "../../var_lib/maps/teams/teamsColorMAP"
import getTeamsPlayersPerSeason from "../teamPlayerList";
import getTeamsGameResults from "../getTeamsGamesResults";
import teamColorsPage from "../teamsColorLayout/teamsColorsPage";
import { SEASONS_WITH_TIE_GAMES } from "../../../constants/consts/vars";
import TeamsPageLayout from "./TeamsPageLayout";

async function setTeamsPageLayout(eventElement) {
  clearTablesDiv();
  clearScoreboardDiv();
  closeSidebar();
  getTablesDiv();
  let team = eventElement.dataset.teamName;
  let seasonNum = eventElement.dataset.seasonNum;
  let teamsSeasonObject =
  TeamStats.allTeamStats[team][`teamsSeason${seasonNum}SeasonStatsMAP`];
  const teamColor = teamsColorMAP.get(team)
  let wins = teamsSeasonObject.get("Wins");
  let losses = teamsSeasonObject.get("Losses");
  let draws = "";
  if (SEASONS_WITH_TIE_GAMES.includes(+seasonNum)) {
    draws = teamsSeasonObject.get("Draws");
  } else {
    draws = teamsSeasonObject.get("OTL");
  }
  // class teamsLayout is grid container
  tablesDiv.append(TeamsPageLayout(team, seasonNum, wins, losses, draws, teamColor))
    // change header banner when team is selected from navbar
    setHeaderBanner(team, seasonNum);
      // change bodies background color to that of team selected
      document.body.style.backgroundColor = `#${teamsColorMAP.get(team)}`;
      // sets tables for that teams players stats for that season
      let playersArea = document.querySelector(".players");
      playersArea.addEventListener("click", getTeamsPlayersPerSeason);
      let teamColorsArea = document.querySelector(".teamColors");
      teamColorsArea.style.backgroundColor = `#${teamsColorMAP.get(team)}`;
      // set listeners on newly created elements (buttons) once entering teams layout page
      let seasonGamesResultsArea = document.querySelector(".seasonScoreboard");
      seasonGamesResultsArea.addEventListener("click", getTeamsGameResults);
      let playoffGamesResultsArea = document.querySelector(".playoffScoreboard");
      playoffGamesResultsArea.addEventListener("click", getTeamsGameResults);
      teamColorsArea.addEventListener("click", teamColorsPage);
  }

  export default  setTeamsPageLayout;
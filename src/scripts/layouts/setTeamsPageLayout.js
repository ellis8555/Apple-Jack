import clearTablesDiv from "../tables/clearTablesDiv";
import getTablesDiv from "../tables/getTablesDiv";
import closeSidebar from "../sidebar/closeSidebar";
import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv";
import TeamStats from "../classFiles/teamStats";
import setHeaderBanner from "./setHeaderBanner";
import teamsColorMAP from "../var_lib/maps/teams/teamsColorMAP"
import getTeamsPlayersPerSeason from "./teamPlayerList";
import getTeamsGameResults from "./getTeamsGamesResults";
import teamColorsPage from "./teamsColorsPage";
import { SEASONS_WITH_TIE_GAMES } from "../../constants/consts/vars";

export default function setTeamsPageLayout(eventElement) {
    clearTablesDiv();
    clearScoreboardDiv();
    closeSidebar();
    getTablesDiv();
    let team = eventElement.dataset.teamName;
    let seasonNum = eventElement.dataset.seasonNum;
    let teamsSeasonObject =
      TeamStats.allTeamStats[team][`teamsSeason${seasonNum}SeasonStatsMAP`];
    let wins = teamsSeasonObject.get("Wins");
    let losses = teamsSeasonObject.get("Losses");
    let draws = "";
    if (SEASONS_WITH_TIE_GAMES.includes(+seasonNum)) {
      draws = teamsSeasonObject.get("Draws");
    } else {
      draws = teamsSeasonObject.get("OTL");
    }
    // class teamsLayout is grid container
    let teamsLayout;
    // 4 divs make up the grid. (teamName, gameType, notes, scoreboard and teamColors)
    teamsLayout = `<div class="w3-container w3-margin teamsLayout">`;
    // team name grid area
    teamsLayout += `<div class="teamName">`;
    teamsLayout += `<h1>${team}</h1>`;
    teamsLayout += `</div>`;
    // gametype grid area
    teamsLayout += `<div class="gameType">`;
    teamsLayout += `<h3>Season ${seasonNum}</h3>`;
    teamsLayout += `</div>`;
    // teams season record grid area
    teamsLayout += `<div class="teamRecord">`;
    // draws will refer to either a tie or OTL depending on that season if it has ties or not
    teamsLayout += `<h3>(${wins} - ${losses} - ${draws})</h3>`;
    teamsLayout += `</div>`;
  
    // players grid area
    teamsLayout += `<div
     data-team-name="${team}"
     data-season-num="${seasonNum}"
     data-game-type="Season"
     class="w3-round w3-green players"
     >`;
    teamsLayout += `Players`;
    teamsLayout += `</div>`;
    // notes grid area **bottom of webpage**
    teamsLayout += `<div class="notes">`;
    // teamsLayout += `<h5>More options will be placed here</h5>`;
    teamsLayout += `</div>`;
    // season scoreboard grid area
    teamsLayout += `<div
      data-team-name="${team}"
      data-season-num="${seasonNum}"
      data-game-type="Season"
      class="w3-round seasonScoreboard"
      >`;
    teamsLayout += `Season Results`;
    teamsLayout += `</div>`;
    // playoff scoreboard grid area
    teamsLayout += `<div
      data-team-name="${team}"
      data-season-num="${seasonNum}"
      data-game-type="Playoff"
      class="w3-round playoffScoreboard"
      >`;
    teamsLayout += `Playoff Results`;
    teamsLayout += `</div>`;
    // teamColors grid area
    teamsLayout += `<div
      data-team-name="${team}"
      data-season-num="${seasonNum}"
      style="background-color: #${teamsColorMAP.get(team)}"
      class="w3-round teamColors"
    >`;
    teamsLayout += `Team Colors`;
    teamsLayout += `</div>`;
    teamsLayout += `</div>`;
    tablesDiv.innerHTML = teamsLayout;
  
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
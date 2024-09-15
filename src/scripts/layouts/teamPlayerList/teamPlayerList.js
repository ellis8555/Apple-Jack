import { TeamPlayers } from "../../../constants/masterHaxData.js";
import playersMAP from "../../var_lib/maps/players/playersMAP.js";
import teamsMAP from "../../var_lib/maps/teams/teamsMAP.js";
import teamsNumMAP from "../../var_lib/maps/teams/teamsNumMAP.js";
import eachTeamObjectMAP from "../../var_lib/maps/teams/eachTeamObjectMAP.js";
import IndividualPlayerStats from "../../classFiles/players/individualPlayerStats.js";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv.js";
import clearTablesDiv from "../../tables/clearTablesDiv.js";
import sortGroupedStats from "../../misc/sorting/sort.js";
import setTeamsPageLayout from "../teamsPageLayout/setTeamsPageLayout.js";
import backButton from "../../misc/backButton.js";
import createPlayerStatsTable from "./components/createPlayerStatsTable.js"
import { PLAYERS_TABLE } from "../../../constants/consts/supportVars.js";
import sortTeamPlayersTables from "./helpers/sortTeamPlayersTables.js";
import setTeamPlayerTableListeners from "./helpers/setTeamPlayerTableListeners.js";
  
  let fieldsLength = PLAYERS_TABLE.length;
  export default function getTeamsPlayersPerSeason(
    e,
    thisTeam,
    thisSeasonNumber,
    seasonSelectedField = "Points",
    playoffSelectedField = "Points",
    combinedSelectedField = "Points"
  ) {
    clearTablesDiv();
    clearScoreboardDiv();
    let team, teamName, teamColor, seasonNum;
    if (e !== false) {
      team = teamsNumMAP.get(e.target.dataset.teamName);
      teamName = teamsMAP.get(+team);
      teamColor = `#${eachTeamObjectMAP.get(teamsMAP.get(team)).MainColor}`;
      seasonNum = e.target.dataset.seasonNum;
    } else {
      team = teamsNumMAP.get(thisTeam);
      teamName = teamsMAP.get(+team);
      teamColor = `#${eachTeamObjectMAP.get(teamsMAP.get(team)).MainColor}`;
      seasonNum = thisSeasonNumber;
    }
    // grab players who played on this team
    const playersFiltered = TeamPlayers.filter(
      (item) => item.TeamID == team && item.SeasonNumber == seasonNum
    );
    // enter players on this team into an array
    const playersArray = [];
    playersFiltered.forEach((item) =>
      playersArray.push(playersMAP.get(+item.PlayerID))
    );
    // push those players seasons stats into team array and sort by points
    const playerSeasonObjects = [];
    playersArray.forEach((item) =>
      playerSeasonObjects.push(
        IndividualPlayerStats.allPlayersStats[item][
          `playersSeason${seasonNum}SeasonStatsMAP`
        ]
      )
    );
    sortGroupedStats(playerSeasonObjects, seasonSelectedField);
    // push those players playoff stats into team array and sort by points
    const playerPlayoffObjects = [];
    playersArray.forEach((item) =>
      playerPlayoffObjects.push(
        IndividualPlayerStats.allPlayersStats[item][
          `playersSeason${seasonNum}PlayoffStatsMAP`
        ]
      )
    );
    sortGroupedStats(playerPlayoffObjects, playoffSelectedField);
    // push those players full season combined stats into team array and sort by points
    const playerCombinedObjects = [];
    playersArray.forEach((item) =>
      playerCombinedObjects.push(
        IndividualPlayerStats.allPlayersStats[item][
          `playersSeason${seasonNum}CombinedStatsMAP`
        ]
      )
    );
    sortGroupedStats(playerCombinedObjects, combinedSelectedField);
  
    // element that will contain the player tables
    const playerStatsTable = document.getElementById("scoreboardDiv");
    playerStatsTable.style.display = "flex";
    playerStatsTable.style.flexDirection = "column";
    playerStatsTable.style.alignItems = "center";

    // add the back button
    const backButtonElement = backButton("playerStatsBackButton", teamName, seasonNum, "Season")
    playerStatsTable.append(backButtonElement)
    // add season header
    const h1 = document.createElement('h1');
    h1.textContent = `Season ${seasonNum}`
    playerStatsTable.append(h1);
    // add list of teams players
    const playersListContainer = document.createElement('div');
        // the following div ID "teamPlayerList" is used for where to position the regular season players table after a sort function
    playersListContainer.id = "teamPlayerList";
    playersListContainer.classList.add("w3-padding", "w3-padding", "w3-card", "w3-round-large")
    playersListContainer.style.color = "#fff";
    playersListContainer.style.backgroundColor = teamColor;
    playersArray.forEach(item => {
      const div = document.createElement('div');
      div.style.fontSize = "1.2rem";
      div.textContent = item;
      playersListContainer.append(div)
    })
    playerStatsTable.append(playersListContainer)
    // begin adding player tables
    // tables arguments object
    const createPlayerStatsTableArgs = {
      PLAYERS_TABLE, 
      seasonSelectedField, 
      playerSeasonObjects, 
      fieldsLength,
      playoffSelectedField,
      combinedSelectedField
    }
    const playersSeasonTable = createPlayerStatsTable('teamPlayerSeasonTable', 'Regular Season', 'season',createPlayerStatsTableArgs)
    playerStatsTable.append(playersSeasonTable)
    // if playoffs have occured add both playoffs and combined tables
    if (playerPlayoffObjects[0].get("GP") > 0) {
      const playersPlayoffTable = createPlayerStatsTable('teamPlayerPlayoffTable', 'Playoffs', 'playoffs',createPlayerStatsTableArgs)
      playerStatsTable.append(playersPlayoffTable)
      const playersCombinedTable = createPlayerStatsTable('teamPlayerCombinedTable', 'Combined Stats', 'combined',createPlayerStatsTableArgs)
      playerStatsTable.append(playersCombinedTable)
    } else {
      // else if season is still on going within the current season
      const h3 = document.createElement('h3');
      h3.textContent = 'No playoff games played'
      playerStatsTable.append(h3)
    }
  
    let playerNameCells = document.querySelectorAll("td[data-field-name='Name']");
    playerNameCells.forEach((item) => {
      item.style.color = "#fff";
      item.style.backgroundColor = teamColor;
    });
  
    // listener for the back button back to teams layout Page
    document
      .getElementById("playerStatsBackButton")
      .addEventListener("click", () => {setTeamsPageLayout(document.getElementById('playerStatsBackButton'))});
    // end back button
  
    ////////////////////BEGIN OF SORTINGFUNCTIONS FOR THE ABOVE 3 TABLES//////////////////////////////
    const sortTeamPlayerTableArgs = {
      PLAYERS_TABLE,
      fieldsLength,
      teamColor
    }
    // regular season sorting and listening function
    function sortTeamPlayersSeasonTable(e) {
      const teamPlayersSeasonTable = sortTeamPlayersTables(e, "teamPlayerSeasonTable", "Regular Season", playerSeasonObjects, sortTeamPlayerTableArgs);
      const seasonTable = document.getElementById("teamPlayerSeasonTable");
      const position = document.querySelector("#teamPlayerList");
      seasonTable.remove();
      position.after(teamPlayersSeasonTable)
  
      setTeamPlayerTableListeners("teamPlayerSeasonTable", sortTeamPlayersSeasonTable); // this resets the listeners on the table after being redisplayed
    }
    setTeamPlayerTableListeners("teamPlayerSeasonTable", (e) => {
      sortTeamPlayersSeasonTable(e);
    })
  
    // playoffs sorting and listening functions
    function sortTeamPlayersPlayoffTable(e) {
      const teamPlayersPlayoffTable = sortTeamPlayersTables(e, "teamPlayerPlayoffTable", "Playoffs", playerPlayoffObjects, sortTeamPlayerTableArgs);
      const playoffTable = document.getElementById("teamPlayerPlayoffTable");
      const position = document.querySelector("#teamPlayerCombinedTable");
      playoffTable.remove();
      position.before(teamPlayersPlayoffTable)
      setTeamPlayerTableListeners("teamPlayerPlayoffTable", sortTeamPlayersPlayoffTable); // this resets the listeners on the table after being redisplayed
    }
    setTeamPlayerTableListeners("teamPlayerPlayoffTable", (e) => {
      sortTeamPlayersPlayoffTable(e);
    })
  
    // combined stats for sorting and listening functions
  
    function sortTeamPlayersCombinedTable(e) {
      const teamPlayerCombinedTable = sortTeamPlayersTables(e, "teamPlayerCombinedTable", "Combined Stats", playerCombinedObjects, sortTeamPlayerTableArgs);
      const combinedTable = document.getElementById("teamPlayerCombinedTable");
      const position = document.querySelector("#teamPlayerPlayoffTable");
      combinedTable.remove();
      position.after(teamPlayerCombinedTable);
      setTeamPlayerTableListeners("teamPlayerCombinedTable", sortTeamPlayersCombinedTable)
    }
    setTeamPlayerTableListeners("teamPlayerCombinedTable", (e) => {
      sortTeamPlayersCombinedTable(e);
    })
  }
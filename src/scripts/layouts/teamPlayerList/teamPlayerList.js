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
import playersList from "./components/playersList.js";
import playersListHeader from "./components/playersListHeader.js";
  
  const fieldsLength = PLAYERS_TABLE.length;

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

    const playerSeasonObjects = [];
    const playerPlayoffObjects = [];
    const playerCombinedObjects = [];

    const mapsArray = ["SeasonStatsMAP", "PlayoffStatsMAP", "CombinedStatsMAP"]
    const playerObjectsArray = [playerSeasonObjects, playerPlayoffObjects, playerCombinedObjects]

    for(let i=0; i<mapsArray.length; i++){
      playersArray.forEach((item) =>
        playerObjectsArray[i].push(
          IndividualPlayerStats.allPlayersStats[item][
            `playersSeason${seasonNum}${mapsArray[i]}`
          ]
        )
      );
    }
    sortGroupedStats(playerSeasonObjects, seasonSelectedField);
    sortGroupedStats(playerPlayoffObjects, playoffSelectedField);
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
    const h1 = playersListHeader(seasonNum)
    playerStatsTable.append(h1);
    // add list of teams players
    const playersListContainer = playersList(playersArray, teamColor)
    playerStatsTable.append(playersListContainer)
    // begin adding player tables
    // tables arguments object
    const createPlayerStatsTableArgs = {
      PLAYERS_TABLE, 
      seasonSelectedField, 
      playerSeasonObjects, 
      playerPlayoffObjects,
      playerCombinedObjects,
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
};

// Configuration array for each table (Season, Playoff, Combined)
const tableConfigs = [
  {
    id: "teamPlayerSeasonTable",
    label: "Regular Season",
    data: playerSeasonObjects,
    afterElement: "#teamPlayerList",
    insertMethod: 'after',
  },
  {
    id: "teamPlayerPlayoffTable",
    label: "Playoffs",
    data: playerPlayoffObjects,
    afterElement: "#teamPlayerCombinedTable",
    insertMethod: 'before',
  },
  {
    id: "teamPlayerCombinedTable",
    label: "Combined Stats",
    data: playerCombinedObjects,
    afterElement: "#teamPlayerPlayoffTable",
    insertMethod: 'after',
  }
];

// Helper function to handle sorting and listeners setup
function sortTeamPlayersTable(e, config) {
  const { id, label, data, afterElement, insertMethod } = config;
  const teamPlayerTable = sortTeamPlayersTables(e, id, label, data, sortTeamPlayerTableArgs);
  const oldTable = document.getElementById(id);
  const position = document.querySelector(afterElement);
  oldTable.remove();
  position[insertMethod](teamPlayerTable);
  
  // Resets the listeners on the table after being redisplayed
  setTeamPlayerTableListeners(id, (event) => sortTeamPlayersTable(event, config));
}

// Setup sorting and listeners for all tables
tableConfigs.forEach((config) => {
  setTeamPlayerTableListeners(config.id, (e) => {
    sortTeamPlayersTable(e, config);
  });
});
}
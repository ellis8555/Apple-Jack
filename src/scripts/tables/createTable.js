import sortGroupedStats from "../misc/sorting/sort";
import closeSidebar from "../sidebar/closeSidebar";
import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv";
import getTablesDiv from "./getTablesDiv";
import setPlayersTableBgColor from "../misc/playerTableBgColor";
import setTeamsTableBgColor from "../misc/setTeamsTableBgColor";
import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP"
import { TABLE_BREAK_POINT, SEASON_WITH_TEAM_LOGOS_START } from "../../constants/consts/vars";
import { Teams, TeamPlayers } from "../../constants/masterHaxData";
import playersNumMAP from "../var_lib/maps/players/playersNumMAP"
import currentSeason from "../var_lib/season/currentSeason";

export default function createTable(
    seasonNumber,
    tableName,
    dataSourceName,
    dataSource,
    color,
    sortBy = "Points",
    fieldsArrayName,
    ...fieldsArray
  ) {
    sortGroupedStats(dataSource, sortBy);
    const tableHeaders = fieldsArray[0];
    const fieldsLength = fieldsArray[0].length; // named array of fields previously made
    const isOTW = tableHeaders.includes("OTW"); // checks for if any given season has tie games or extra time
    let screenedDataSource;
    // check if dataSource is a teams table
    const isTeamTable = dataSourceName.includes("TeamStats");
    // check if dataSource is a player table
    const isPlayerTable = dataSourceName.includes("Individual");
    // check if dataSource is team Playoff table
    const isPlayoffTable = dataSourceName.includes("Playoff");
    if ((isTeamTable || isPlayerTable) && isPlayoffTable) {
      screenedDataSource = dataSource.filter((item) => item.get("GP") > 0);
    } else {
      screenedDataSource = dataSource;
    }
    // dom created table
    const tableStats = document.createElement('table');

    // create table heading
    const tableCaptionElem = document.createElement('caption');
    const tableCaptionHeading = document.createElement('h1');
    tableCaptionHeading.textContent = tableName;

    // append the table caption
    tableCaptionElem.append(tableCaptionHeading);
    tableStats.append(tableCaptionElem);

    // begin table headers
    const tableHeadElem = document.createElement('thead');
    const tableHeadRowElem = document.createElement('tr');
    for (let i = 0; i < fieldsLength; i++) {
      const tableHeaderElem = document.createElement('th');
      tableHeaderElem.setAttribute('data-season-Number', seasonNumber)
      tableHeaderElem.setAttribute('data-data-source', dataSourceName)
      tableHeaderElem.setAttribute('data-array-source', fieldsArrayName)
      tableHeaderElem.setAttribute('data-field-name', tableHeaders[i])
      tableHeaderElem.textContent = tableHeaders[i];
      // add orange color to table heading if header is sortBy
      if(tableHeaders[i] == sortBy){
        tableHeaderElem.classList.add("w3-orange")
      }
      // append each <th> to row
      tableHeadRowElem.append(tableHeaderElem);
    }
    // append th row to <thead>
    tableHeadElem.append(tableHeadRowElem)
    // append <thead> to table
    tableStats.append(tableHeadElem)
    // begin each row of table data
    screenedDataSource.forEach((item) => {
      // create a new table row element for each field
      const tableRowElem = document.createElement('tr');
    
      for (let j = 0; j < fieldsLength; j++) {
        // create table data cell element
        const tableDataElem = document.createElement('td');
        tableDataElem.setAttribute('data-season-number', seasonNumber);
        tableDataElem.setAttribute('data-data-source', dataSourceName);
        tableDataElem.setAttribute('data-array-source', fieldsArrayName);
        tableDataElem.setAttribute('data-field-name', tableHeaders[j]);
    
        // add class for sorted column if applicable
        if (tableHeaders[j] === sortBy) {
          tableDataElem.classList.add(color);
        }

        // check if wins need to be adjusted for OTW and set the content accordingly
        if (isOTW && tableHeaders[j] === "Wins") {
          tableDataElem.textContent = item.get(tableHeaders[j]) - item.get("OTW");
        } else {
          tableDataElem.textContent = item.get(tableHeaders[j]);
        }
        // this is column for team logos which table header is blank  
        // 0 refers to all time player stats  
        if(seasonNumber >= SEASON_WITH_TEAM_LOGOS_START){
        // add team logo column for larger screens in it's own column
        if(tableHeaders[j] === ""){
          const seasonNumberAsNumber = parseInt(seasonNumber)
          const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
          const teamLogo = document.createElement('img')
          teamLogo.alt = 'img'
          if(isTeamTable){
            // seasons where teams now have ai generated team logos
            const teamsLogoName = eachTeamObjectMAP.get(item.get('Team'))[`${seasonNumberFolderName}HomeFilePath`]
            teamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
            tableDataElem.style.backgroundColor = "#" + eachTeamObjectMAP.get(item.get('Team')).MainColor
            tableDataElem.append(teamLogo)
          }
          if(isPlayerTable){
            // allows 0 which refers to all time player stats
            const playersTeamID = TeamPlayers.filter((seasonNum) => seasonNum.SeasonNumber == seasonNumber).filter((player) => player.PlayerID === playersNumMAP.get(item.get('Name')))[0].TeamID
            const playersTeamName = Teams.find((team) => team.TeamID === playersTeamID).TeamName
            const teamsLogoName = eachTeamObjectMAP.get(playersTeamName)[`${seasonNumberFolderName}HomeFilePath`]
              // seasons where teams now have ai generated team logos
              teamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
              tableDataElem.style.backgroundColor = "#" + eachTeamObjectMAP.get(playersTeamName).MainColor
              tableDataElem.append(teamLogo)
          }
          // finally add styles image element
          if(window.innerWidth >= TABLE_BREAK_POINT){
            teamLogo.style.height = '2.25rem'
            teamLogo.style.width = '2.25rem'
            tableDataElem.style.borderLeft = "1px solid white"
          }
          }
          // add team logo to right of team name on smaller screens where table is vertical in display
          if(tableHeaders[j] === 'Team'){
            const seasonNumberAsNumber = parseInt(seasonNumber)
            const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
            const teamName = eachTeamObjectMAP.get(item.get("Team"))[`${seasonNumberFolderName}HomeFilePath`]
            const teamLogo = document.createElement('img')
            teamLogo.alt = 'img'
            teamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${teamName}.png`
            if((window.innerWidth < TABLE_BREAK_POINT)){
              teamLogo.style.height = '1.75rem'
              teamLogo.style.width = '1.75rem'
              // teamLogo.style.transform = "translateY(-.65rem)"
              tableDataElem.style.display = 'flex'
              tableDataElem.style.justifyContent = "space-between"
              teamLogo.style.transform = "translateY(-.65rem)"
            }
            tableDataElem.append(teamLogo)
          }
          // add team logo to right of players name on smaller screens where table is vertical in display
          if(tableHeaders[j] === 'Name'){
            const seasonNumberAsNumber = parseInt(seasonNumber)
            const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
            const teamLogo = document.createElement('img')
            teamLogo.alt = 'img'
            const playersTeamID = TeamPlayers.filter((seasonNum) => seasonNum.SeasonNumber >= seasonNumber).filter((player) => player.PlayerID === playersNumMAP.get(item.get('Name')))[0].TeamID
            const playersTeamName = Teams.find((team) => team.TeamID === playersTeamID).TeamName
            const teamsLogoName = eachTeamObjectMAP.get(playersTeamName)[`${seasonNumberFolderName}HomeFilePath`]
            teamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
            if((window.innerWidth < TABLE_BREAK_POINT)){
              teamLogo.style.height = '1.75rem'
              teamLogo.style.width = '1.75rem'
              tableDataElem.style.display = 'flex'
              tableDataElem.style.justifyContent = "space-between"
              teamLogo.style.transform = "translateY(-.65rem)"
            }
            tableDataElem.append(teamLogo)
          }
        }

        // add team logo to players all time stats table on larger screens
        if(tableHeaders[j] === "" && seasonNumber == 0){
          if(isPlayerTable){
            // allows 0 which refers to all time player stats
            const playersTeamIDArray = TeamPlayers.filter((seasonNum) => seasonNum.SeasonNumber == currentSeason).filter((player) => player.PlayerID === playersNumMAP.get(item.get('Name')))
            if(playersTeamIDArray.length > 0){   
                const teamLogo = document.createElement('img')
                teamLogo.alt = 'img'
                const playersTeamID = playersTeamIDArray[0].TeamID            
                const playersTeamName = Teams.find((team) => team.TeamID === playersTeamID).TeamName
                const seasonNumberFolderName = currentSeason>9 ? `S${currentSeason}` : `S0${currentSeason}`
                const teamsLogoName = eachTeamObjectMAP.get(playersTeamName)[`${seasonNumberFolderName}HomeFilePath`]
                // seasons where teams now have ai generated team logos              
                teamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
                tableDataElem.style.backgroundColor = "#" + eachTeamObjectMAP.get(playersTeamName).MainColor
                // // finally add styles image element
                if(window.innerWidth >= TABLE_BREAK_POINT){
                  teamLogo.style.height = '2.25rem'
                  teamLogo.style.width = '2.25rem'
                  tableDataElem.style.borderLeft = "1px solid white"
                }
                tableDataElem.append(teamLogo)
              }
            }
        }

        // add team logo to players all time stats table on smaller screens with vertical tables
          if(tableHeaders[j] === "Name" && seasonNumber == 0){
          if(isPlayerTable){
            // allows 0 which refers to all time player stats
            const playersTeamIDArray = TeamPlayers.filter((seasonNum) => seasonNum.SeasonNumber == currentSeason).filter((player) => player.PlayerID === playersNumMAP.get(item.get('Name')))
            if(playersTeamIDArray.length > 0){   
                const teamLogo = document.createElement('img')
                teamLogo.alt = 'img'
                const playersTeamID = playersTeamIDArray[0].TeamID            
                const playersTeamName = Teams.find((team) => team.TeamID === playersTeamID).TeamName
                const seasonNumberFolderName = currentSeason>9 ? `S${currentSeason}` : `S0${currentSeason}`
                const teamsLogoName = eachTeamObjectMAP.get(playersTeamName)[`${seasonNumberFolderName}HomeFilePath`]
                // seasons where teams now have ai generated team logos              
                teamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
                tableDataElem.style.backgroundColor = "#" + eachTeamObjectMAP.get(playersTeamName).MainColor
                // // finally add styles image element
                if(window.innerWidth < TABLE_BREAK_POINT){
                  tableDataElem.style.borderLeft = "1px solid white"
                  teamLogo.style.height = '1.75rem'
                  teamLogo.style.width = '1.75rem'
                  tableDataElem.style.display = 'flex'
                  tableDataElem.style.justifyContent = "space-between"
                  teamLogo.style.transform = "translateY(-.65rem)"
                }
                tableDataElem.append(teamLogo)
              }
            }
        }


        // append the cell to the row
        tableRowElem.append(tableDataElem);
      }
    
      // append the row to the table body
      tableStats.append(tableRowElem);
    });
  
    closeSidebar();
    clearScoreboardDiv();
  
    // display table on web page
    const tablesDiv = getTablesDiv(); // import function
    // clear tablesDiv before appending new data
    tablesDiv.innerHTML = tableStats.outerHTML
  
    // function to change background-color on team row viewed on smaller screens
    if (isTeamTable) {
      setTeamsTableBgColor();
    } else {
      setPlayersTableBgColor(seasonNumber);
    }
  }
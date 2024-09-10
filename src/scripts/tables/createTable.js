import sortGroupedStats from "../misc/sorting/sort";
import closeSidebar from "../sidebar/closeSidebar";
import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv";
import getTablesDiv from "./getTablesDiv";
import setPlayersTableBgColor from "../misc/playerTableBgColor";
import setTeamsTableBgColor from "../misc/setTeamsTableBgColor";

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
    let tableHeaders = fieldsArray[0];
    let fieldsLength = fieldsArray[0].length; // named array of fields previously made
    let isOTW = tableHeaders.includes("OTW"); // checks for if any given season has tie games or extra time
    let screenedDataSource;
    // check if dataSource is a teams table
    let isTeamTable = dataSourceName.includes("TeamStats");
    // check if dataSource is a player table
    let isPlayerTable = dataSourceName.includes("Individual");
    // check if dataSource is team Playoff table
    let isPlayoffTable = dataSourceName.includes("Playoff");
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
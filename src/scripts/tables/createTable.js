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
    let tableStats;
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
    // html table begin
    tableStats = "<table>";
    // html table caption
    tableStats += `<caption><h1>${tableName}</h1></caption>`;
    // html table thead
    tableStats += "<thead><tr>";
    for (let i = 0; i < fieldsLength; i++) {
      tableStats +=
        `<th data-season-Number=${seasonNumber} data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
        tableHeaders[i] +
        " >" +
        tableHeaders[i] +
        "</th>";
    }
    tableStats += "</tr></thead>";
    // end of html table header fields row
  
    screenedDataSource.forEach((item) => {
      // table data begins for each field
      tableStats += "<tr>";
  
      for (let j = 0; j < fieldsLength; j++) {
        if (tableHeaders[j] == sortBy) {
          // this if part adds highlight to sorted column
          tableStats +=
            `<td data-season-Number=${seasonNumber} data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} class=${color} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >";
          // this if correctly outputs wins - OTW in full table view
          if (isOTW && tableHeaders[j] == "Wins") {
            tableStats += item.get(tableHeaders[j]) - item.get("OTW");
          } else {
            tableStats += item.get(tableHeaders[j]);
          }
          tableStats += "</td>";
        } else {
          tableStats +=
            `<td  data-season-Number=${seasonNumber} data-data-source=${dataSourceName} data-array-source=${fieldsArrayName} data-field-name=` + //data-fieldNames required for mobile layout
            tableHeaders[j] +
            " >";
          // this if correctly outputs wins - OTW in full table view
          if (isOTW && tableHeaders[j] == "Wins") {
            tableStats += item.get(tableHeaders[j]) - item.get("OTW");
          } else {
            tableStats += item.get(tableHeaders[j]);
          }
          tableStats += "</td>";
        }
      }
      tableStats += "</tr>";
    });
  
    // html table ends
    tableStats += "</table>";
  
    closeSidebar();
    clearScoreboardDiv();
  
    // display table on web page
    const tablesDiv = getTablesDiv(); // import function
    tablesDiv.innerHTML = tableStats;
  
    // function to change background-color on team row viewed on smaller screens
    if (isTeamTable) {
      setTeamsTableBgColor();
    } else {
      setPlayersTableBgColor(seasonNumber);
    }
  }
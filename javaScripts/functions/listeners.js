import {
  sortTable,
  getTeamsGameResults,
  setTeamsPageLayout,
  setHomeTable,
  setS02SeasonFullTable,
  setS02PlayoffTable,
  setS02CombinedTable,
  setPlayerAllTimeSeason,
  setPlayerAllTimePlayoff,
  setPlayerAllTimePoints,
  setPlayerS02Playoff,
  setPlayerS02Season,
  setPlayerS02Combined,
  setS01RegularSeason,
  setS01PlayoffTable,
  setS01CombinedTable,
  setPlayerS01Season,
  setPlayerS01Playoff,
  setPlayerS01Combined,
} from "../setData/setTables/teamsTables.js";
import { openSidebar, closeSidebar } from "./variousFunctions.js";
import { displayTaskList } from "../setData/announcements.js";
import setMainNavbar from "./mainNavbar.js";
import { getTeamsPlayersPerSeason } from "./teamPlayerList.js";
// testing on new imported test functions
import { leagueTeamRecords } from "./records/teamRecords/teamRecords.js";
setMainNavbar();
// import {
//   setPlayerS01Season,
//   setPlayerS01Playoff,
//   setPlayerS01Combined,
// } from "../setData/setTables/playersTables.js";
import screenResize from "./resize.js";

// listeners on table headers for sorting table on larger screens
export function setTableListeners() {
  let browserWidth = window.innerWidth;
  if (browserWidth < 982) {
    let mobileTableCells = document.querySelectorAll("#tablesDiv");
    mobileTableCells[0].onclick = function (e) {
      let td = e.target.closest("td");
      if (!td) return;
      sortTable(e);
    };
  } else {
    let getFieldNames = document.querySelectorAll("#tablesDiv");
    getFieldNames[0].onclick = function (e) {
      let th = e.target.closest("th");
      if (!th) return;
      sortTable(e);
    };
  }
}
setTableListeners();

// set home on header haxball logo

let headerLogo = document.querySelector("img[alt*='Haxball']");
headerLogo.addEventListener("click", setHomeTable);

// set home on sidebar home nav

let homeSidebar = document.querySelector("#home");
homeSidebar.addEventListener("click", setHomeTable);

// for toggling the sub menus within sidebar menu

let teamsTables = document.querySelectorAll(".teamTable");
let playersTables = document.querySelectorAll(".playerTable");

function hideTeamSubMenu() {
  teamsTables.forEach((item) => item.classList.add("w3-hide"));
}

function hidePlayerSubMenu() {
  playersTables.forEach((item) => item.classList.add("w3-hide"));
}

function hideAllSubMenus() {
  hideTeamSubMenu();
  hidePlayerSubMenu();
}

function displayTeamSubMenu() {
  if (teamsTables[0].classList.contains("w3-hide")) {
    teamsTables.forEach((item) => {
      item.classList.remove("w3-hide");
      item.classList.add("w3-yellow");
    });
  }
}

// teams sub menus
document
  .getElementById("teamSidebar")
  .addEventListener("click", displayTeamSubMenu);
document
  .getElementById("teamSidebar")
  .addEventListener("click", hidePlayerSubMenu);

// players table sub menus

function displayPlayerSubMenu() {
  if (playersTables[0].classList.contains("w3-hide")) {
    playersTables.forEach((item) => {
      item.classList.remove("w3-hide");
      item.classList.add("w3-yellow");
    });
  }
}

document
  .getElementById("playerSidebar")
  .addEventListener("click", displayPlayerSubMenu);
document
  .getElementById("playerSidebar")
  .addEventListener("click", hideTeamSubMenu);

// end sub menus toggling
// listeners for sidebar links. functions located in ./setData/setTables/teamsTables.js
//CURRENT SEASON STATS
//current teams table
document
  .getElementById("fullTable")
  .addEventListener("click", setS02SeasonFullTable);
// current players table
document
  .getElementById("s02PlayerPlayoffTable")
  .addEventListener("click", setPlayerS02Playoff);
document
  .getElementById("s02PlayerSeasonTable")
  .addEventListener("click", setPlayerS02Season);
document
  .getElementById("s02PlayerCombinedTable")
  .addEventListener("click", setPlayerS02Combined);
// TEAMS TABLES (no all time as teams probably change every season?)
document
  .getElementById("S01RegularSeason")
  .addEventListener("click", setS01RegularSeason);
document
  .getElementById("s01PlayoffTable")
  .addEventListener("click", setS01PlayoffTable);
document
  .getElementById("s01CombinedTable")
  .addEventListener("click", setS01CombinedTable);
// PLAYERS TALBES
// all time
allTimePlayerPointsTable;
document
  .getElementById("allTimePlayerPointsTable")
  .addEventListener("click", setPlayerAllTimePoints);
document
  .getElementById("allTimePlayerSeasonTable")
  .addEventListener("click", setPlayerAllTimeSeason);
document
  .getElementById("allTimePlayerPlayoffTable")
  .addEventListener("click", setPlayerAllTimePlayoff);

// season 1
document
  .getElementById("s01PlayerSeasonTable")
  .addEventListener("click", setPlayerS01Season);
document
  .getElementById("s01PlayerPlayoffTable")
  .addEventListener("click", setPlayerS01Playoff);
document
  .getElementById("s01PlayerCombinedTable")
  .addEventListener("click", setPlayerS01Combined);
// season 2
document
  .getElementById("s02PlayoffTable")
  .addEventListener("click", setS02PlayoffTable);
document
  .getElementById("s02CombinedTable")
  .addEventListener("click", setS02CombinedTable);
// league records
document
  .getElementById("leagueRecords")
  .addEventListener("click", leagueTeamRecords.teamGoals);
// tasks list page
document
  .getElementById("announcements")
  .addEventListener("click", displayTaskList);

// mobile open/close sidebar navbar. functions located in hax94.js

document.getElementById("openSidebar").addEventListener("click", openSidebar);
document
  .getElementById("sidebar")
  .addEventListener("mouseleave", hideAllSubMenus);
document.getElementById("sidebar").addEventListener("mouseleave", closeSidebar);

// TEAMS LAYOUT PAGE

export function setListenersMainNavbar() {
  let getTeamsFromNavBar = document.querySelectorAll("img[data-team-name]");
  getTeamsFromNavBar.forEach((item) =>
    // item.addEventListener("click", getTeamsGameResults)
    item.addEventListener("click", setTeamsPageLayout)
  );
}
setListenersMainNavbar();

// responsive function for live resizing of screen

let documentBodyObserver = new ResizeObserver((entries) => {
  let getTeamPlayerSeasonTable = document.querySelectorAll(
    "#teamPlayerSeasonTable"
  );
  let getTeamPlayerPlayoffTable = document.querySelectorAll(
    "#teamPlayerPlayoffTable"
  );
  let getTeamPlayerCombinedTable = document.querySelectorAll(
    "#teamPlayerCombinedTable"
  );
  if (getTeamPlayerSeasonTable.length == 0) {
    screenResize();
  } else {
    let teamPlayerBackButton = document.getElementById("playerStatsBackButton");
    // e is undefined so given value of false
    // 2nd, 3rd and 4th arguments
    let team = teamPlayerBackButton.dataset.teamName;
    let seasonNumber = teamPlayerBackButton.dataset.seasonNum;
    let teamLogo = teamPlayerBackButton.dataset.teamLogo;
    // 5th argument season table
    let getSeasonTableData = document.querySelectorAll(
      "#teamPlayerSeasonTable td[class='w3-yellow']"
    );
    let getSeasonSelectedField = getSeasonTableData[0].dataset.fieldName;
    // 6th argument playoff table
    let getPlayoffSelectedField;
    if (getTeamPlayerPlayoffTable.length > 0) {
      let getPlayoffTableData = document.querySelectorAll(
        "#teamPlayerPlayoffTable td[class='w3-yellow']"
      );
      getPlayoffSelectedField = getPlayoffTableData[0].dataset.fieldName;
    } else {
      getPlayoffSelectedField = "Points";
    }
    // 7th argument
    let getCombinedSelectedField;
    if (getTeamPlayerCombinedTable.length > 0) {
      let getCombinedTableData = document.querySelectorAll(
        "#teamPlayerCombinedTable td[class='w3-yellow']"
      );
      getCombinedSelectedField = getCombinedTableData[0].dataset.fieldName;
    } else {
      getCombinedSelectedField = "Points";
    }

    getTeamsPlayersPerSeason(
      false,
      team,
      seasonNumber,
      teamLogo,
      getSeasonSelectedField,
      getPlayoffSelectedField,
      getCombinedSelectedField
    );
  }
});

documentBodyObserver.observe(document.body);
// window.onresize = screenResize; // old way of changing table views on screen resizing

// testing

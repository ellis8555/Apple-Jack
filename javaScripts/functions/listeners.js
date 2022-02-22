import {
  sortTable,
  getTeamsGameResults,
  setTeamsPageLayout,
  setHomeTable,
  setS02SeasonFullTable,
  setPlayerAllTimeSeason,
  setPlayerAllTimePlayoff,
  setPlayerAllTimePoints,
  setPlayerS02Season,
  setS01RegularSeason,
  setS01PlayoffTable,
  setS01CombinedTable,
  setPlayerS01Season,
  setPlayerS01Playoff,
  setPlayerS01Combined,
} from "../setData/setTables/teamsTables.js";
import {
  openSidebar,
  closeSidebar,
  displaySlides,
} from "./variousFunctions.js";
import { displayTaskList } from "../setData/siteTaskList.js";
import setMainNavbar from "./mainNavbar.js";
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
    let mobileTableCells = document.querySelectorAll("#tablesDiv td");
    let eachCell = Array.from(mobileTableCells);
    eachCell.forEach((field) => field.addEventListener("click", sortTable));
  } else {
    let getFieldNames = document.querySelectorAll("#tablesDiv th");
    let headers = Array.from(getFieldNames);
    headers.forEach((field) => field.addEventListener("click", sortTable));
  }
}
setTableListeners();

// set home on header haxball logo

let headerLogo = document.querySelector("img[alt*='Haxball']");
headerLogo.addEventListener("click", setHomeTable);

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
document.getElementById("currentTable").addEventListener("click", setHomeTable);
document
  .getElementById("fullTable")
  .addEventListener("click", setS02SeasonFullTable);
// current players table
document
  .getElementById("s02PlayerSeasonTable")
  .addEventListener("click", setPlayerS02Season);
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
document.getElementById("otherStats").addEventListener("click", displaySlides);
// tasks list page
document
  .getElementById("siteTaskList")
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

// testing

// responsive function for live resizing of screen

window.onresize = screenResize; // enables sorting data when switching to mobile view

import {
  sortTable,
  setHomeTable,
  setPlayoffTable,
  setPlayerS01Season,
  setPlayerS01Playoff,
  setPlayerS01Combined,
} from "../setData/setTables/teamsTables.js";

import { openSidebar, closeSidebar, displaySlides } from "./hax94.js";

// import {
//   setPlayerS01Season,
//   setPlayerS01Playoff,
//   setPlayerS01Combined,
// } from "../setData/setTables/playersTables.js";
import screenResize from "../resize.js";

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

// listeners for sidebar links. functions located in class.js

document.getElementById("homeTable").addEventListener("click", setHomeTable);
document
  .getElementById("s01PlayoffTable")
  .addEventListener("click", setPlayoffTable);
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

// mobile open/close sidebar navbar. functions located in hax94.js

document.getElementById("openSidebar").addEventListener("click", openSidebar);
document.getElementById("sidebar").addEventListener("mouseleave", closeSidebar);
// mobile navbar listeners

// responsive function for live resizing of screen

window.onresize = screenResize; // enables sorting data when switching to mobile view

///////////////////// USED IN OLD DESIGN //////////////////////

// document.getElementById("homeTable").addEventListener("click", function () {
//   CLASSsetHomePageTableS01FinalStandings.fetchData();
// });

// document
//   .getElementById("s01PlayerSeasonStats")
//   .addEventListener("click", function () {
//     CLASSs01PlayerStats.fetchData();
//   });

// document
//   .getElementById("s01PlayerPlayoffStats")
//   .addEventListener("click", function () {
//     CLASSs01PlayoffPlayerStats.fetchData();
//   });

// document.getElementById("s01FullTable").addEventListener("click", function () {
//   CLASSsetFullTableS01FinalStandings.fetchData();
// });

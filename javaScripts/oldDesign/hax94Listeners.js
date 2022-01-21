import { setHomeTable, sortTable } from "../setData/setTables/teamsTables.js";
import screenResize from "../resize.js";

// listeners on table headers for sorting table on larger screens
export function setTableListeners() {
  let browserWidth = window.innerWidth;
  if (browserWidth < 982) {
    let tableContainer = document.getElementById("tablesDiv");
    let mobileCells = tableContainer.querySelectorAll("table td");
    let eachCell = Array.from(mobileCells);
    eachCell.forEach((field) => field.addEventListener("click", sortTable));
  } else {
    let tableContainer = document.getElementById("tablesDiv");
    let getFieldNames = tableContainer.querySelectorAll("table th");
    let headers = Array.from(getFieldNames);
    headers.forEach((field) => field.addEventListener("click", sortTable));
  }
}
setTableListeners();
// listeners for sidebar links. functions located in class.js

document.getElementById("homeTable").addEventListener("click", setHomeTable);

// mobile open/close sidebar navbar. functions located in has94.js

document.getElementById("openSidebar").addEventListener("click", openSidebar);
document.getElementById("sidebar").addEventListener("mouseleave", closeSidebar);
// mobile navbar listeners
document.getElementById("closeSidebar").addEventListener("click", closeSidebar);

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

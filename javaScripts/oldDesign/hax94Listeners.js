// listeners on table headers for sorting table on larger screens
import { sortTable } from "../setData/setTables/teamsTables.js";
let tableContainer = document.getElementById("tablesDiv");
let getFieldNames = tableContainer.querySelectorAll("table th");
let headers = Array.from(getFieldNames);
headers.forEach((field) => field.addEventListener("click", sortTable));

// listeners for sidebar links. functions located in class.js

// mobile open/close sidebar navbar. functions located in has94.js

document.getElementById("openSidebar").addEventListener("click", openSidebar);
document.getElementById("sidebar").addEventListener("mouseleave", closeSidebar);
// mobile navbar listeners
document.getElementById("closeSidebar").addEventListener("click", closeSidebar);

// responsive function for live resizing of screen

// window.onresize = Stats.screenResize; // enables sorting data when switching to mobile view

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

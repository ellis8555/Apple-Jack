import openSidebar from "../../sidebar/openSidebar";
import closeSidebar from "../../sidebar/closeSidebar";
import hideAllSubMenus from "../../sidebar/hideAllSubMenus"
import hideTeamSubMenu from "../../sidebar/teams/hideTeamSubMenu";
import displayTeamSubMenu from "../../sidebar/teams/displayTeamSubMenu"
import hidePlayerSubMenu from "../../sidebar/players/hidePlayerSubMenu";
import displayPlayerSubMenu from "../../sidebar/players/displayPlayerSubMenu"
import setHomeTable from "../../tables/setHomeTable";
  
  // sidebar menu
  document.getElementById("openSidebar").addEventListener("click", openSidebar);
  document.getElementById("sidebar").addEventListener("mouseleave", closeSidebar);

  // home option 
  const homeSidebar = document.querySelector("#home");
  homeSidebar.addEventListener("click", setHomeTable);
  
  // teams sub menus
  document
    .getElementById("teamSidebar")
    .addEventListener("click", () => {
      displayTeamSubMenu();
      hidePlayerSubMenu();
    });
  // players sub menus
  document
    .getElementById("playerSidebar")
    .addEventListener("click", () => {
      displayPlayerSubMenu();
      hideTeamSubMenu();
    });
  // mobile open/close sidebar navbar
  document.getElementById("openSidebar").addEventListener("click", openSidebar);
  document
    .getElementById("sidebar")
    .addEventListener("mouseleave", () => {
      hideAllSubMenus();
      closeSidebar();
    });
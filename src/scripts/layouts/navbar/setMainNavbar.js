// this function is run in listeners.js
import eachSeasonsTeamsMAP from "../../var_lib/maps/teams/eachSeasonsTeamsMAP"
import setListenersMainNavbar from "../../listeners/listenerHelpers/setListenersMainNavbar";
import currentSeason from "../../var_lib/season/currentSeason";
import setTeamLogoCss from "./helpers/setTeamLogoCss"
  
  export default function setMainNavbar(season) {
    // season can be 0 when choosing all time player stats from menu
    // season can become undefined when resizing the screen when all time player stats are showing
    if(season === 0 || season == undefined){
      season = currentSeason
    }
    let screenWidth = window.innerWidth;
    const teamsThisSeason = eachSeasonsTeamsMAP.get(season).length;
    let navbarContainer = document.querySelector("#teamsNavbar > section");
    let navbarContent = "";
    // if statement to prevent to many team logos which appear too small on one navbar
    if (teamsThisSeason > 5 && screenWidth < 500) {
      // this is for more teams than 5 which on mobile becomes to crowded
      navbarContainer.style.flexDirection = "column";
      navbarContent += `<div>`; // container for first row of teams
      for (let i = 0; i < teamsThisSeason / 2; i++) {
        // first row of teams
        navbarContent = setTeamLogoCss(navbarContent, season, i);
      }
      navbarContent += `</div>`; // end first row of teams container
      navbarContent += `<div>`; // container for second row of teams
      // second row of teams
      for (let i = teamsThisSeason / 2; i < teamsThisSeason; i++) {
        navbarContent = setTeamLogoCss(navbarContent, season, i)
      }
      navbarContent += `</div>`; // end second row of teams container
    } else {
      navbarContainer.style.flexDirection = "row";
      // else less than 5 teams looks good on mobile
      for (let i = 0; i < teamsThisSeason; i++) {
        // navbarContent = setLayout(imageSource, navbarContent, season, i);
        navbarContent = setTeamLogoCss(navbarContent, season, i)
      }
    }
  
    navbarContainer.innerHTML = navbarContent;
    setListenersMainNavbar();
  }
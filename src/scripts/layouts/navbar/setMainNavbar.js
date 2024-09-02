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
    const screenWidth = window.innerWidth;
    const teamsThisSeason = eachSeasonsTeamsMAP.get(season).length;
    const navbarContainer = document.querySelector("#teamsNavbar > section");
    const navbarContent = document.createDocumentFragment()
    // if statement to prevent to many team logos which appear too small on one navbar
    if (teamsThisSeason > 5 && screenWidth < 600) {
      // this is for more teams than 5 which on mobile becomes to crowded
      navbarContainer.style.flexDirection = "column";
      const navbarContentContainer = document.createElement('div');
      navbarContentContainer.style.width = "100%";
      navbarContentContainer.style.display = "flex";
      navbarContentContainer.style.justifyContent = "space-around";

      // create second row of teams
      const secondRowContainer = navbarContentContainer.cloneNode();
      
      for (let i = 0; i < teamsThisSeason / 2; i++) {
        // first row of teams
        navbarContentContainer.append(setTeamLogoCss(navbarContent, season, i));
      }
      // second row of teams
      for (let i = teamsThisSeason / 2; i < teamsThisSeason; i++) {
        secondRowContainer.append(setTeamLogoCss(navbarContent, season, i))
      }
      navbarContent.append(navbarContentContainer)
      navbarContent.append(secondRowContainer)
      
    } else {
      navbarContainer.style.flexDirection = "row";
      // else less than 5 teams looks good on mobile
      for (let i = 0; i < teamsThisSeason; i++) {
        // navbarContent = setLayout(imageSource, navbarContent, season, i);
        navbarContent.append(setTeamLogoCss(navbarContent, season, i))
      }
    }
    navbarContainer.innerHTML = "";
    navbarContainer.append(navbarContent);

    // increase css logo sizes on seasons team counts that require multiple navbar rows
    if (teamsThisSeason > 5 && screenWidth < 600) {
      const mobileNavlogoContainers = document.querySelectorAll(".navLogoContainer");
      mobileNavlogoContainers.forEach((row, index) => {
        if(index !== 0){
          const eachCssLogo = row.firstElementChild;
          eachCssLogo.style.width = "3.25rem";
          eachCssLogo.style.height = "3.25rem";
        }
      });
    }

    setListenersMainNavbar();
  }
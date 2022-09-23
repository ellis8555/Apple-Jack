// this function is run in listeners.js

import {
  eachTeamObjectMAP,
  eachSeasonsTeamsMAP,
  currentSeason,
  teams,
} from "../../json/masterVars.js";
import { setListenersMainNavbar } from "./listeners.js";

export default function setMainNavbar(season = currentSeason) {
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
      let imageSource = eachTeamObjectMAP.get(
        eachSeasonsTeamsMAP.get(season)[i]
      )[`S0${season}HomeFilePath`];

      navbarContent += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
      navbarContent += `<div class="w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section">`; // begin second div
      navbarContent += `<div>`; // begin third div

      navbarContent += `<img 
          src="${imageSource}" 
          alt="${eachSeasonsTeamsMAP.get(season)[i]}" 
          data-team-name="${eachSeasonsTeamsMAP.get(season)[i]}" 
          data-season-num="${season}"
          class="w3-image navLogo"
          >`;

      navbarContent += `</div>`; // end third div
      navbarContent += `</div>`; // end second div
      navbarContent += `</div>`; // end first div
    }
    navbarContent += `</div>`; // end first row of teams container
    navbarContent += `<div>`; // container for second row of teams
    // second row of teams
    for (let i = teamsThisSeason / 2; i < teamsThisSeason; i++) {
      let imageSource = eachTeamObjectMAP.get(
        eachSeasonsTeamsMAP.get(season)[i]
      )[`S0${season}HomeFilePath`];

      navbarContent += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
      navbarContent += `<div class="w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section">`; // begin second div
      navbarContent += `<div>`; // begin third div

      navbarContent += `<img 
          src="${imageSource}" 
          alt="${eachSeasonsTeamsMAP.get(season)[i]}" 
          data-team-name="${eachSeasonsTeamsMAP.get(season)[i]}" 
          data-season-num="${season}"
          class="w3-image navLogo"
          >`;

      navbarContent += `</div>`; // end third div
      navbarContent += `</div>`; // end second div
      navbarContent += `</div>`; // end first div
    }
    navbarContent += `</div>`; // end second row of teams container
  } else {
    // else less than 5 teams looks good on mobile
    for (let i = 0; i < teamsThisSeason; i++) {
      let imageSource = eachTeamObjectMAP.get(
        eachSeasonsTeamsMAP.get(season)[i]
      )[`S0${season}HomeFilePath`];
      navbarContent += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
      navbarContent += `<div class="w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section">`; // begin second div
      navbarContent += `<div>`; // begin third div

      navbarContent += `<img 
          src="${imageSource}" 
          alt="${eachSeasonsTeamsMAP.get(season)[i]}" 
          data-team-name="${eachSeasonsTeamsMAP.get(season)[i]}" 
          data-season-num="${season}"
          class="w3-image navLogo"
          >`;

      navbarContent += `</div>`; // end third div
      navbarContent += `</div>`; // end second div
      navbarContent += `</div>`; // end first div
    }
  }

  navbarContainer.innerHTML = navbarContent;
  setListenersMainNavbar();
}

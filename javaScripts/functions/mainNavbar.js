// this function is run in listeners.js

import {
  eachTeamObjectMAP,
  eachSeasonsTeamsMAP,
  currentSeason,
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
      navbarContent = setLayout(imageSource, navbarContent, season, i);
    }
    navbarContent += `</div>`; // end first row of teams container
    navbarContent += `<div>`; // container for second row of teams
    // second row of teams
    for (let i = teamsThisSeason / 2; i < teamsThisSeason; i++) {
      let imageSource = eachTeamObjectMAP.get(
        eachSeasonsTeamsMAP.get(season)[i]
      )[`S0${season}HomeFilePath`];
      navbarContent = setLayout(imageSource, navbarContent, season, i);
    }
    navbarContent += `</div>`; // end second row of teams container
  } else {
    // else less than 5 teams looks good on mobile
    for (let i = 0; i < teamsThisSeason; i++) {
      let imageSource = eachTeamObjectMAP.get(
        eachSeasonsTeamsMAP.get(season)[i]
      )[`S0${season}HomeFilePath`];
      navbarContent = setLayout(imageSource, navbarContent, season, i);
    }
  }

  navbarContainer.innerHTML = navbarContent;
  setListenersMainNavbar();
}

function setLayout(imageSource, element, season, id) {
  let image = imageSource; //eachTeamObjectMAP.get(eachSeasonsTeamsMAP.get(season)[i])[`S0${season}HomeFilePath`];
  element += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
  element += `<div class="w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section">`; // begin second div
  element += `<div>`; // begin third div

  element += `<img 
      src="${image}" 
      alt="${eachSeasonsTeamsMAP.get(season)[id]}" 
      data-team-name="${eachSeasonsTeamsMAP.get(season)[id]}" 
      data-season-num="${season}"
      class="w3-image navLogo"
      >`;

  element += `</div>`; // end third div
  element += `</div>`; // end second div
  element += `</div>`; // end first div
  return element;
}

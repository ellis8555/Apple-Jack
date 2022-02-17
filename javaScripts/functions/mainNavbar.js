// this function is run in listeners.js

import {
  eachTeamObjectMAP,
  eachSeasonsTeamsMAP,
  currentSeason,
  teams,
} from "../../json/masterVars.js";

export function setMainNavbar(season = currentSeason) {
  let navbarContainer = document.querySelector("#teamsNavbar > section");
  let navbarContent = "";
  for (let i = 0; i < eachSeasonsTeamsMAP.get(season).length; i++) {
    let imageSource = eachTeamObjectMAP.get(eachSeasonsTeamsMAP.get(season)[i])[
      `S0${season}HomeFilePath`
    ];
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

  navbarContainer.innerHTML = navbarContent;
}

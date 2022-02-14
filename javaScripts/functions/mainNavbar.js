// this function is run in listeners.js

import {
  eachSeasonsTeamsMAP,
  currentSeason,
  teams,
} from "../../json/masterVars.js";

export function setMainNavbar() {
  let navbarContainer = document.querySelector("#teamsNavbar > section");
  let navbarContent = "";

  for (let i = 0; i < eachSeasonsTeamsMAP.get(currentSeason).length; i++) {
    let imageSource = teams[i].S01HomeFilePath;
    navbarContent += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
    navbarContent += `<div class="w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section">`; // begin second div
    navbarContent += `<div>`; // begin third div

    navbarContent += `<img 
        src="${imageSource}" 
        alt="${eachSeasonsTeamsMAP.get(currentSeason)[i]}" 
        data-team-name="${eachSeasonsTeamsMAP.get(currentSeason)[i]}" 
        data-season-num="${currentSeason}"
        class="w3-image navLogo"
        >`;

    navbarContent += `</div>`; // end third div
    navbarContent += `</div>`; // end second div
    navbarContent += `</div>`; // end first div
  }

  navbarContainer.innerHTML = navbarContent;
}

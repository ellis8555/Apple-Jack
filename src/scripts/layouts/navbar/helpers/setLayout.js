import eachSeasonsTeamsMAP from "../../../var_lib/maps/teams/eachSeasonsTeamsMAP";

function setLayout(imageSource, element, season, id) {
    let image = imageSource;
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

  export default setLayout
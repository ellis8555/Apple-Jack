import eachTeamObjectMAP from "../../../var_lib/maps/teams/eachTeamObjectMAP";
import eachSeasonsTeamsMAP from "../../../var_lib/maps/teams/eachSeasonsTeamsMAP";
import getTeams3dColorScheme from "../../../misc/getTeams3DColorScheme"
import { HC_FONT } from "../../../../constants/consts/vars";

function setTeamLogoCss(element, season, id = undefined, teamNameParam = undefined) {
    let teamName;
    if(id != undefined){
        teamName = eachSeasonsTeamsMAP.get(season)[id];
    } 

    if(teamNameParam != undefined){
        teamName = teamNameParam;  
    }

    const homeColorString = `S0${season}Home`
    const teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
    const colorParts = teamsColorScheme.split(" ")
    const mainColor = colorParts[2];

    element += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
    element += `<div class="${id != undefined ?'w3-card-4 w3-blue w3-round-xlarge':''} w3-padding-small w3-section">`; // begin second div
    // begin third div
    element += `<div
        data-team-name="${teamName}" 
        data-season-num="${season}"
        class="navLogo three-d-Logo"
        style="display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >`; 
    element += `<div style="color: #${colorParts[1]};font-weight: 500;font-size: ${HC_FONT.setTeamLogoCss}; transform: rotate(-${colorParts[0]}deg);">HC</div>` // 4th div
    element += `</div>`; // end third div
    element += `</div>`; // end second div
    element += `</div>`; // end first div
    return element;
}

export default setTeamLogoCss;
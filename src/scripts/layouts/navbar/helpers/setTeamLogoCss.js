import eachSeasonsTeamsMAP from "../../../var_lib/maps/teams/eachSeasonsTeamsMAP";
import createTeamCssLogo from "../../../misc/createTeamCssLogo";

function setTeamLogoCss(element, season, id = undefined, teamNameParam = undefined) {
    let teamName;
    if(id != undefined){
        teamName = eachSeasonsTeamsMAP.get(season)[id];
    } 

    if(teamNameParam != undefined){
        teamName = teamNameParam;  
    }

    element += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
    element += `<div class="${id != undefined ?'w3-card-4 w3-blue w3-round-xlarge':''} w3-padding-small w3-section">`; // begin second div
    // begin third div which is imported
    element += createTeamCssLogo.setTeamLogoCss(teamName, season, "Home")
    element += `</div>`; // end second div
    element += `</div>`; // end first div
    return element;
}

export default setTeamLogoCss;
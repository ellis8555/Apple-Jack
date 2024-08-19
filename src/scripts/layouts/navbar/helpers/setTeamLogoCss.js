import eachTeamObjectMAP from "../../../var_lib/maps/teams/eachTeamObjectMAP";
import eachSeasonsTeamsMAP from "../../../var_lib/maps/teams/eachSeasonsTeamsMAP";

function setTeamLogoCss(element, season, id) {
    const teamName = eachSeasonsTeamsMAP.get(season)[id];
    const homeColorString = `S0${season}Home`
    const teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
    const colorParts = teamsColorScheme.split(" ")
    const mainColor = colorParts[2];

    function getTeams3dColorScheme(){
        let teams3dColorScheme;
        const colorPartsLength = colorParts.length;
        switch(colorPartsLength){
            case 3:
                teams3dColorScheme = `#${colorParts[2]}`
                return teams3dColorScheme
            case 4:
                teams3dColorScheme = `linear-gradient(to right, #${colorParts[2]} 50%, #${colorParts[3]} 51%)`
                return teams3dColorScheme
            case 5:
                teams3dColorScheme = `linear-gradient(to right, #${colorParts[2]} 35%, #${colorParts[3]} 36% 64%, #${colorParts[4]} 65%)`
                return teams3dColorScheme
                default:
                return `#${mainColor}`
        }
    }
    element += `<div class="w3-container w3-cell w3-cell-middle">`; // begin first div
    element += `<div class="w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section">`; // begin second div
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
    ${getTeams3dColorScheme()};
    transform: rotate(${colorParts[0]}deg);"
    >`; 
    element += `<div style="color: #${colorParts[1]};font-weight: 500;font-size: clamp(.25rem, 2.5vw, 6.25rem); transform: rotate(-${colorParts[0]}deg);">HC</div>` // 4th div
    element += `</div>`; // end third div
    element += `</div>`; // end second div
    element += `</div>`; // end first div
    return element;
}

export default setTeamLogoCss;
// this method is used in createTeamCssLogo.js
// html all above methods contain but adds custom width/height styles

import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP"
import getTeams3dColorScheme from "./getTeams3DColorScheme"

function createCssLogoSkeleton({width, height, fontSize, teamName, seasonNumber, homeOrAway}){
    let colorString = `S0${seasonNumber}${homeOrAway}`
    let teamsColorScheme = eachTeamObjectMAP.get(teamName)[colorString]
    let colorParts = teamsColorScheme.split(" ")
    let mainColor = colorParts[2];
    return `<div
        data-team-name="${teamName}" 
        data-season-num="${seasonNumber}"
        class="navLogo three-d-Logo"
        style="width:${width};height:${height}; margin:auto; display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${fontSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`
}

export default createCssLogoSkeleton;
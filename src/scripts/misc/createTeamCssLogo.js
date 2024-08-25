import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";
import getTeams3dColorScheme from "./getTeams3DColorScheme";
import { HC_FONT } from "../../constants/consts/vars";

const createTeamCssLogo = {
    // setTeamLogoCss page
    "setTeamLogoCss": function(teamName, seasonNumber, homeOrAway){
        const homeColorString = `S0${seasonNumber}${homeOrAway}`
        const teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
        const colorParts = teamsColorScheme.split(" ")
        const mainColor = colorParts[2];

        return `
        <div
        data-team-name="${teamName}" 
        data-season-num="${seasonNumber}"
        class="navLogo three-d-Logo"
        style="display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 500;font-size: ${HC_FONT.setTeamLogoCss}; transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>
        `
    },
    // games results page
    "getTeamsGamesResults": function(teamName, seasonNumber, homeOrAway){
        const homeColorString = `S0${seasonNumber}${homeOrAway}`
        const teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
        const colorParts = teamsColorScheme.split(" ")
        const mainColor = colorParts[2];

        return `<div
        data-team-name="${teamName}" 
        data-season-num="${seasonNumber}"
        class="navLogo three-d-Logo"
        style="width: 85%; height: 85%; display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${HC_FONT.getTeamsGamesResults}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`
    },
    // gifs page
    "setGifs": function(teamName, seasonNumber, homeOrAway){
        let homeColorString = `S0${seasonNumber}${homeOrAway}`
        let teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
        let colorParts = teamsColorScheme.split(" ")
        let mainColor = colorParts[2];

        return `<div
        data-team-name="${teamName}" 
        data-season-num="${seasonNumber}"
        class="navLogo three-d-Logo"
        style="width: 7.5rem; height: 6rem; display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${HC_FONT.setGifs}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`
    },
    // boxscore for a single game page
    "singleGameStats": function(teamName, seasonNumber, homeOrAway){
        let homeColorString = `S0${seasonNumber}${homeOrAway}`
        let teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
        let colorParts = teamsColorScheme.split(" ")
        let mainColor = colorParts[2];

        return `<div
        data-team-name="${teamName}" 
        data-season-num="${seasonNumber}"
        class="navLogo three-d-Logo"
        style="width: 8rem; height: 6rem; display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${HC_FONT.singleGameStats}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`
    },
    // teams color page
    "teamsColorsPage": function(teamName, seasonNumber, homeOrAway){
        let homeColorString = `S0${seasonNumber}${homeOrAway}`
        let teamsColorScheme = eachTeamObjectMAP.get(teamName)[homeColorString]
        let colorParts = teamsColorScheme.split(" ")
        let mainColor = colorParts[2];

        return `<div
        data-team-name="${teamName}" 
        data-season-num="${seasonNumber}"
        class="navLogo three-d-Logo"
        style="width: 55%; height: 55%; margin:auto; display: grid; place-items: center;background-color: #${mainColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${HC_FONT.teamColors}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`
    },
}

export default createTeamCssLogo;
import eachSeasonsTeamsMAP from "../../../var_lib/maps/teams/eachSeasonsTeamsMAP";
import createTeamCssLogo from "../../../misc/createTeamCssLogo";
import parseStringToDOM from "../../../misc/parsedStringToDOM";

function setTeamLogoCss(element, season, id = undefined, teamNameParam = undefined) {
    let teamName;
    if(id != undefined){
        teamName = eachSeasonsTeamsMAP.get(season)[id];
    } 

    if(teamNameParam != undefined){
        teamName = teamNameParam;  
    }

    const containerElem = document.createElement('div');
    containerElem.classList.add("w3-container", "w3-cell", "w3-cell-middle");

    const innerDiv = document.createElement('div');
    const innerDivClass = id != undefined ? "w3-card-4 w3-blue w3-round-xlarge navLogoContainer" : "w3-padding-small w3-section navLogoContainer";
    const splitClasses = innerDivClass.split(" ");
    splitClasses.forEach(className => {
        innerDiv.classList.add(className)
    })
    const cssLogoElement = createTeamCssLogo.setTeamLogoCss(teamName, season, "Home")

    const parsedLogo = parseStringToDOM(cssLogoElement)

    innerDiv.append(parsedLogo);

    containerElem.append(innerDiv);
    return containerElem;
}

export default setTeamLogoCss;
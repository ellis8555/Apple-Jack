import createTeamCssLogo from "../../../misc/createTeamCssLogo";

function TeamsLogoElement(teamName, seasonNumber, homeOrAway, homeOrAlternate, colorScheme){
    const containerElem = document.createElement('div');
    const innerContainerElem = document.createElement('div');
    const titleContainerElem = document.createElement('div');
    const redBlueElem = document.createElement('div');
    const redContainer = document.createElement("div")
    const blueContainer = document.createElement("div")

    containerElem.classList.add(`teamColors${homeOrAway}Content`, "w3-container", "w3-padding", "w3-blue", "w3-round-large")
    containerElem.style.setProperty('height', '16rem', 'important');

    innerContainerElem.classList.add("w3-card-4", "w3-padding", "w3-yellow", "w3-round-large")
 
    const titleElem = document.createElement("h5");
    titleElem.textContent = homeOrAlternate;
    titleContainerElem.append(titleElem);

    redContainer.setAttribute("data-color-scheme", `/colors red ${colorScheme}`)
    redContainer.classList.add("w3-padding", "w3-round", "w3-center", "w3-red", "red")
    redContainer.textContent = "left"

    blueContainer.setAttribute("data-color-scheme", `/colors blue ${colorScheme}`)
    blueContainer.classList.add("w3-padding", "w3-round", "w3-center", "w3-blue", "blue")
    blueContainer.textContent = "right"

    redBlueElem.classList.add("w3-container", "w3-padding", "redBlue")
    redBlueElem.append(redContainer)
    redBlueElem.append(blueContainer)


    innerContainerElem.append(titleContainerElem);
    const teamLogo = createTeamCssLogo.teamsColorsPage(teamName, seasonNumber, homeOrAway);
    const parser = new DOMParser()
    const doc = parser.parseFromString(teamLogo, 'text/html');
    const teamsLogoCssElem = doc.body.firstChild
    innerContainerElem.append(teamsLogoCssElem)
    innerContainerElem.append(redBlueElem);

    containerElem.append(innerContainerElem);
    return containerElem;
}
export default TeamsLogoElement
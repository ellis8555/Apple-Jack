import backButton from "../../../misc/backButton";
import createTeamCssLogo from "../../../misc/createTeamCssLogo";

function singleGameStatsHeader({teamName, thisSeasonNumber, gameType, thisGamesHomeTeam, thisGamesAwayTeam}){
    const containerElem = document.createElement('div')
    containerElem.classList.add("w3-section", "boxscoreTeamLogosContainer");

    // for parsing the button and css logos
    const parser = new DOMParser()
    // create the back button
    const backButtonHTML = backButton("gamesBoxscoreBackButton", teamName, thisSeasonNumber, gameType, "boxscoreBackButton").outerHTML;
    const button = parser.parseFromString(backButtonHTML, 'text/html');
    const backButtonElem = button.body.firstChild
    // append the back button
    containerElem.append(backButtonElem)

    // create the css logos
    const homeLogoHTML = createTeamCssLogo.singleGameStats(thisGamesHomeTeam, thisSeasonNumber, "Home") 
    const awayLogoHTML = createTeamCssLogo.singleGameStats(thisGamesAwayTeam, thisSeasonNumber, "Away")

    const homeTeamLogo = parser.parseFromString(homeLogoHTML, 'text/html').body.firstChild;
    const awayTeamLogo = parser.parseFromString(awayLogoHTML, 'text/html').body.firstChild;

    // create div to hold both logos
    // home team
    const homeLogoContainerElem = document.createElement('div');
    homeLogoContainerElem.classList.add("w3-blue", "w3-round-large", "w3-card-4", "w3-padding-small", "boxscoreHomeTeamLogo")
    homeLogoContainerElem.append(homeTeamLogo)
    // away team
    const awayLogoContainerElem = document.createElement('div');
    awayLogoContainerElem.classList.add("w3-blue", "w3-round-large", "w3-card-4", "w3-padding-small", "boxscoreAwayTeamLogo")
    awayLogoContainerElem.append(awayTeamLogo)
    // append the home logo
    containerElem.append(homeLogoContainerElem)
    // append the away logo
    containerElem.append(awayLogoContainerElem)

    return containerElem;
}

export default singleGameStatsHeader;
import backButton from "../../../misc/backButton";
import createTeamCssLogo from "../../../misc/createTeamCssLogo";
import { SEASON_WITH_TEAM_LOGOS_START } from "../../../../constants/consts/vars";

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

    // get teams logos depending on season number and if team logos existed or are css generated
    let homeTeamLogo
    let awayTeamLogo
    if(thisSeasonNumber < SEASON_WITH_TEAM_LOGOS_START){
        // create the css logos for earlier seasons when there were no logos created
        const homeLogoHTML = createTeamCssLogo.singleGameStats(thisGamesHomeTeam, thisSeasonNumber, "Home") 
        const awayLogoHTML = createTeamCssLogo.singleGameStats(thisGamesAwayTeam, thisSeasonNumber, "Away")
    
        homeTeamLogo = parser.parseFromString(homeLogoHTML, 'text/html').body.firstChild;
        awayTeamLogo = parser.parseFromString(awayLogoHTML, 'text/html').body.firstChild;
    } else {
        // later seasons when team logos have been created
        // get home teams logo
        const seasonNumberAsNumber = parseInt(thisSeasonNumber)
        const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${thisSeasonNumber}` : `S0${thisSeasonNumber}`
        homeTeamLogo = document.createElement('img')
        homeTeamLogo.alt = 'img'
        homeTeamLogo.style.height = '6.25rem'
        homeTeamLogo.style.width = '8.25rem'
        if(thisGamesHomeTeam === ".Hax"){
            thisGamesHomeTeam = "dotHax"
        }
        homeTeamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${thisGamesHomeTeam}.png`
        if(thisGamesHomeTeam === "dotHax"){
            thisGamesHomeTeam = "Hax"
        }
        
        // get away teams logo
        awayTeamLogo = document.createElement('img')
        awayTeamLogo.alt = 'img'
        awayTeamLogo.style.height = '6.25rem'
        awayTeamLogo.style.width = '8.25rem'
        if(thisGamesAwayTeam === ".Hax"){
            thisGamesAwayTeam = "dotHax"
        }
        awayTeamLogo.src = `../../../img/teamLogos/${seasonNumberFolderName}/${thisGamesAwayTeam}.png`
        if(thisGamesAwayTeam === "dotHax"){
            thisGamesAwayTeam = ".Hax"
        }
    }

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
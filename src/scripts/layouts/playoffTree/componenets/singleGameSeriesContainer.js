import bestOfSeriesGameResult from "./bestOfSeriesGameResult";
import createElement from "../../../misc/createElement";
import teamsNumMAP from "../../../var_lib/maps/teams/teamsNumMAP";
import teamsColorMAP from "../../../var_lib/maps/teams/teamsColorMAP";
import eachTeamObjectMAP from "../../../var_lib/maps/teams/eachTeamObjectMAP";
import { TEAM_LOGO_SIZE } from "../../../../constants/consts/vars";

function singleGameSeriesContainer({teamOne, teamOneRank, teamTwo, teamTwoRank, gamesArray, seriesNum, seasonNumber}){
    // flex container for alignments
    const semiDivContainer = createElement("div", `secondRoundDiv${seriesNum}Container`)
    // flex container for alignments
    const semiInnerContainer = createElement("div", `semi${seriesNum}`)
    // flex containers that contain the series data
    const series = createElement("div", "series")
    // team one flex container
    const seriesTeam1Results = singleGameSeries(teamOne, gamesArray, "team1", teamOneRank, seasonNumber)
    // team two flex container
    const seriesTeam2Results = singleGameSeries(teamTwo, gamesArray, "team2", teamTwoRank, seasonNumber)

    // append each teams row of results
    series.append(seriesTeam1Results.seriesFrag)
    series.append(seriesTeam2Results.seriesFrag)
    semiInnerContainer.append(series)
    semiDivContainer.append(semiInnerContainer)

    return {
        semiDivContainer,
        seriesTeam1Results,
        seriesTeam2Results
    }
}

function singleGameSeries(team, gamesArray, teamOneOrTwo, teamsStanding, seasonNumber, isFinals = false){
    const filteredPlayoffGamesArray = [gamesArray]
    // if the series has been played
    if(filteredPlayoffGamesArray.length > 0){
        const seriesFrag = document.createDocumentFragment()
        
        const teamGameOne = createElement("div", teamOneOrTwo)
        // team one name
        const teamName = createElement("div", "teamData")
        teamName.style.display = 'flex'
        teamName.style.justifyContent = 'space-between'
        teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
        teamName.textContent = `(${teamsStanding}) ` + team.get("Team")
        // team one logo
         const seasonNumberAsNumber = parseInt(seasonNumber)
        const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
        const teamLogo = document.createElement('img')
        const teamsLogoName = eachTeamObjectMAP.get(team.get("Team"))[`${seasonNumberFolderName}HomeFilePath`]
        teamLogo.src = `../../../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
        teamLogo.alt = 'img'
        teamLogo.style.height = TEAM_LOGO_SIZE
        teamLogo.style.width = TEAM_LOGO_SIZE
        teamName.append(teamLogo)
        
        // team one game one score
        const teamGameOneScore = createElement("div", "teamData")
        const teamsNum = teamsNumMAP.get(team.get("Team"))
        const gameOneScore = filteredPlayoffGamesArray[0].TeamOne == teamsNum ? filteredPlayoffGamesArray[0].TeamOneScore : filteredPlayoffGamesArray[0].TeamTwoScore
        teamGameOneScore.textContent = gameOneScore;
        let isTeamOneInGameResult = filteredPlayoffGamesArray[0].TeamOne == teamsNum ? true : false;
        // wins counts to determine if this team wins the series
        let wins = 0;
        let resultBgColor;
        const gameOneResult = bestOfSeriesGameResult(isTeamOneInGameResult, filteredPlayoffGamesArray, 0, resultBgColor, wins)
        wins = gameOneResult.wins;
        resultBgColor = gameOneResult.resultBgColor
        if(filteredPlayoffGamesArray[0].ExtraTime === "Yes"){
            if(resultBgColor === "limegreen"){
                resultBgColor = "#2196F3"
            }
            if(resultBgColor === "red"){
                resultBgColor = "#9E9E9E"
            }
        }
        teamGameOneScore.style.backgroundColor = resultBgColor;
        
        teamGameOne.append(teamName)
        teamGameOne.append(teamGameOneScore)
    

        seriesFrag.append(teamGameOne)

    return {
        seriesFrag,
    }
    // else return team names with score symbols for yet to be played games
    } else {
            const seriesFrag = document.createDocumentFragment()
        
            const teamGameOne = createElement("div", teamOneOrTwo)
                // team one name
            const teamName = createElement("div", "teamData")
            teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
            teamName.textContent = `(${teamsStanding}) ` + team.get("Team")
            // team one game one score
            const teamGameOneScore = createElement("div", "teamData")
            teamGameOneScore.textContent = "-";
            // team one game two score
            const teamGameTwoScore = createElement("div", "teamData")
            teamGameTwoScore.textContent = "-"
            
            teamGameOne.append(teamName)
            teamGameOne.append(teamGameOneScore)
        
            seriesFrag.append(teamGameOne)
            return {seriesFrag}
    }
}

export default singleGameSeriesContainer;
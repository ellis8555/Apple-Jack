import teamsColorMAP from "../../../var_lib/maps/teams/teamsColorMAP";
import teamsNumMAP from "../../../var_lib/maps/teams/teamsNumMAP";
import createElement from "../../../misc/createElement";
import bestOfSeriesGameResult from "./bestOfSeriesGameResult";
import { TEAM_LOGO_SIZE } from "../../../../constants/consts/vars";

function bestOfSeries(seasonNumber, team, playoffGamesArray, teamOneOrTwo, teamsStanding, isFinals = false){
    // check if is finals series
    if(isFinals){
            const seriesFrag = document.createDocumentFragment()

            const teamGameOne = createElement("div", teamOneOrTwo)
            // team one name
            const teamName = createElement("div", "teamData")
            teamName.style.display = 'flex'
            teamName.style.justifyContent = 'space-between'
            teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
            let seriesWinner;
            let wins = 0;
            // checks if finals are set either no teams or one team
            if(team){
                // create team name text/rank div
                const teamNameText = createElement('div')
                teamNameText.textContent = `(${teamsStanding + 1}) ` + team.get("Team")
                teamName.append(teamNameText)
                // create teams logo if logo exists
                if(seasonNumber >= 5){
                    const seasonNumberAsNumber = parseInt(seasonNumber)
                    const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
                    const teamLogo = document.createElement('img')
                    teamLogo.src = `../../../../../img/teamLogos/${seasonNumberFolderName}/${team.get("Team")}.png`
                    teamLogo.alt = 'img'
                    teamLogo.style.height = TEAM_LOGO_SIZE
                    teamLogo.style.width = TEAM_LOGO_SIZE
                    teamName.append(teamLogo)
                }
                teamGameOne.append(teamName)
                if(playoffGamesArray.length > 0){                    
                    // team one game one score
                    const teamGameOneScore = createElement("div", "teamData")
                    const teamsNum = teamsNumMAP.get(team.get("Team"))
                    const gameOneScore = playoffGamesArray[0].TeamOne == teamsNum ? playoffGamesArray[0].TeamOneScore : playoffGamesArray[0].TeamTwoScore
                    teamGameOneScore.textContent = gameOneScore;
                    let isTeamOneInGameResult = playoffGamesArray[0].TeamOne == teamsNum ? true : false;
                    // wins counts to determine if this team wins the series
                    let resultBgColor;
                    const gameOneResult = bestOfSeriesGameResult(isTeamOneInGameResult, playoffGamesArray, 0, resultBgColor, wins)
                    wins = gameOneResult.wins;
                    resultBgColor = gameOneResult.resultBgColor
                    teamGameOneScore.style.backgroundColor = resultBgColor;
                    // team one game two score
                    const teamGameTwoScore = createElement("div", "teamData")
                    const gameTwoScore = (playoffGamesArray[1].TeamOne == teamsNum) ? playoffGamesArray[1].TeamOneScore : playoffGamesArray[1].TeamTwoScore
                    teamGameTwoScore.textContent = gameTwoScore
                    isTeamOneInGameResult = playoffGamesArray[1].TeamOne == teamsNum ? true : false;
                    const gameTwoResult = bestOfSeriesGameResult(isTeamOneInGameResult, playoffGamesArray, 1, resultBgColor, wins)
                    wins = gameTwoResult.wins;
                    resultBgColor = gameTwoResult.resultBgColor
                    teamGameTwoScore.style.backgroundColor = resultBgColor;
                    
                    teamGameOne.append(teamGameOneScore)
                    teamGameOne.append(teamGameTwoScore)
                    const wasThirdGamePlayed = playoffGamesArray.length;
                    if(wasThirdGamePlayed > 2){
                        // team one game three score
                        const teamGameThreeScore = createElement("div", "teamData")
                        const gameThreeScore = (playoffGamesArray[2].TeamOne == teamsNum) ? playoffGamesArray[2].TeamOneScore : playoffGamesArray[2].TeamTwoScore
                        teamGameThreeScore.textContent = gameThreeScore
                        isTeamOneInGameResult = playoffGamesArray[2].TeamOne == teamsNum ? true : false;
                        const gameThreeResult = bestOfSeriesGameResult(isTeamOneInGameResult, playoffGamesArray, 2, resultBgColor, wins)
                        wins = gameThreeResult.wins;
                        resultBgColor = gameThreeResult.resultBgColor
                        teamGameThreeScore.style.backgroundColor = resultBgColor;
                        teamGameOne.append(teamGameThreeScore)
                    } else {
                        // team one game three score
                        const teamGameThreeScore = createElement("div", "teamData")
                        teamGameThreeScore.textContent = "-"
                        teamGameOne.append(teamGameThreeScore)
                    }
                }
                // pass back which team won the series to be used in next round information
            if(wins == 2){
                seriesWinner = team.get("Team")
            } else {
                    seriesWinner = null
                }
            } else {
                teamName.innerHTML = "TBD <br> <br> vs";
                teamGameOne.append(teamName)
            }
            seriesFrag.append(teamGameOne)
            return {
                seriesFrag,
                seriesWinner,
                wins
            }
    }
    // these are not final series
    // filter out games that only have this team
    const filteredPlayoffGamesArray = playoffGamesArray.filter(game => {
        if(game.TeamOne == teamsNumMAP.get(team.get("Team")) || game.TeamTwo == teamsNumMAP.get(team.get("Team"))) {
            return game;
        }
    });
    // if the series has been played
    if(filteredPlayoffGamesArray.length > 0){
        const seriesFrag = document.createDocumentFragment()
        
        const teamGameOne = createElement("div", teamOneOrTwo)
        // team one name container
        const teamName = createElement("div", "teamData")
        teamName.style.display = 'flex'
        teamName.style.justifyContent = 'space-between'
        teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
        // team one name and rank
        const teamNameText = createElement('div')
        teamNameText.textContent = `(${teamsStanding}) ` + team.get("Team")
        teamName.append(teamNameText)
        if(seasonNumber >= 5){
            // team one team logo
            const seasonNumberAsNumber = parseInt(seasonNumber)
            const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
            const teamLogo = document.createElement('img')
            teamLogo.src = `../../../../../img/teamLogos/${seasonNumberFolderName}/${team.get("Team")}.png`
            teamLogo.alt = 'img'
            teamLogo.style.height = TEAM_LOGO_SIZE
            teamLogo.style.width = TEAM_LOGO_SIZE
            teamName.append(teamLogo)
        }

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
        teamGameOneScore.style.backgroundColor = resultBgColor;
        // team one game two score
        const teamGameTwoScore = createElement("div", "teamData")
        const gameTwoScore = (filteredPlayoffGamesArray[1].TeamOne == teamsNum) ? filteredPlayoffGamesArray[1].TeamOneScore : filteredPlayoffGamesArray[1].TeamTwoScore
        teamGameTwoScore.textContent = gameTwoScore
        isTeamOneInGameResult = filteredPlayoffGamesArray[1].TeamOne == teamsNum ? true : false;
        const gameTwoResult = bestOfSeriesGameResult(isTeamOneInGameResult, filteredPlayoffGamesArray, 1, resultBgColor, wins)
        wins = gameTwoResult.wins;
        resultBgColor = gameTwoResult.resultBgColor
        teamGameTwoScore.style.backgroundColor = resultBgColor;
        
        teamGameOne.append(teamName)
        teamGameOne.append(teamGameOneScore)
        teamGameOne.append(teamGameTwoScore)
        
        const wasThirdGamePlayed = filteredPlayoffGamesArray.length;
        if(wasThirdGamePlayed > 2){
            // team one game three score
            const teamGameThreeScore = createElement("div", "teamData")
            const gameThreeScore = (filteredPlayoffGamesArray[2].TeamOne == teamsNum) ? filteredPlayoffGamesArray[2].TeamOneScore : filteredPlayoffGamesArray[2].TeamTwoScore
            teamGameThreeScore.textContent = gameThreeScore
            isTeamOneInGameResult = filteredPlayoffGamesArray[2].TeamOne == teamsNum ? true : false;
            const gameThreeResult = bestOfSeriesGameResult(isTeamOneInGameResult, filteredPlayoffGamesArray, 2, resultBgColor, wins)
            wins = gameThreeResult.wins;
            resultBgColor = gameThreeResult.resultBgColor
            teamGameThreeScore.style.backgroundColor = resultBgColor;
            teamGameOne.append(teamGameThreeScore)
        } else {
            // team one game three score
            const teamGameThreeScore = createElement("div", "teamData")
            teamGameThreeScore.textContent = "-"
            teamGameOne.append(teamGameThreeScore)
        }
        seriesFrag.append(teamGameOne)
        // pass back which team won the series to be used in next round information
        let seriesWinner;
        if(wins == 2){
            seriesWinner = team.get("Team")
        } else {
            seriesWinner = null
        }
    return {
        seriesFrag,
        seriesWinner,
        wins
    }
    // else return team names with score symbols for yet to be played games
    } else {
            const seriesFrag = document.createDocumentFragment()
        
            const teamGameOne = createElement("div", teamOneOrTwo)
            // team one name container
            const teamName = createElement("div", "teamData")
            teamName.style.display = 'flex'
            teamName.style.justifyContent = 'space-between'
            teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
            // team name text div
            const teamNameText = createElement('div')
            teamNameText.textContent = `(${teamsStanding}) ` + team.get("Team")
            teamName.append(teamNameText)
            // append team logo if logo exists
            if(seasonNumber >= 5){
                // team one team logo
                const seasonNumberAsNumber = parseInt(seasonNumber)
                const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
                const teamLogo = document.createElement('img')
                teamLogo.src = `../../../../../img/teamLogos/${seasonNumberFolderName}/${team.get("Team")}.png`
                teamLogo.alt = 'img'
                teamLogo.style.height = TEAM_LOGO_SIZE
                teamLogo.style.width = TEAM_LOGO_SIZE
                teamName.append(teamLogo)
            }
            // team one game one score
            const teamGameOneScore = createElement("div", "teamData")
            teamGameOneScore.textContent = "-";
            // team one game two score
            const teamGameTwoScore = createElement("div", "teamData")
            teamGameTwoScore.textContent = "-"
            
            teamGameOne.append(teamName)
            teamGameOne.append(teamGameOneScore)
            teamGameOne.append(teamGameTwoScore)
            // team one game three score
            const teamGameThreeScore = createElement("div", "teamData")
            teamGameThreeScore.textContent = "-"
            teamGameOne.append(teamGameThreeScore)
        
            seriesFrag.append(teamGameOne)
            return {seriesFrag}
    }
}

export default bestOfSeries;
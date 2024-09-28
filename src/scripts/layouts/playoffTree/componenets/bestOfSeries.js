import teamsColorMAP from "../../../var_lib/maps/teams/teamsColorMAP";
import teamsNumMAP from "../../../var_lib/maps/teams/teamsNumMAP";

function bestOfSeries(team, playoffGamesArray, teamOneOrTwo, teamsStanding, isFinals = false){
    // check if is finals series
    if(isFinals){
            const seriesFrag = document.createDocumentFragment()

            const teamGameOne = document.createElement("div");
            teamGameOne.classList.add(teamOneOrTwo)
            // team one name
            const teamName = document.createElement("div")
            teamName.classList.add("teamData")
            // checks if finals are set either one no teams or one team
            if(team){
                teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
                teamName.textContent = `(${teamsStanding + 1}) ` + team.get("Team")
            } else {
                teamName.innerHTML = "vs <br> <br> TBD";
            }
            teamGameOne.append(teamName)
                // pass back which team won the series to be used in next round information
            let seriesWinner;
            let wins = 0
            if(wins == 2){
                seriesWinner = team.get("Team")
            } else {
                    seriesWinner = null
                }
                seriesFrag.append(teamGameOne)
            return {
                seriesFrag,
                seriesWinner
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
        
        const teamGameOne = document.createElement("div");
        teamGameOne.classList.add(teamOneOrTwo)
        // team one name
        const teamName = document.createElement("div")
        teamName.classList.add("teamData")
        teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
        teamName.textContent = `(${teamsStanding}) ` + team.get("Team")
        // team one game one score
        const teamGameOneScore = document.createElement("div")
        teamGameOneScore.classList.add("teamData")
        const teamsNum = teamsNumMAP.get(team.get("Team"))
        const gameOneScore = filteredPlayoffGamesArray[0].TeamOne == teamsNum ? filteredPlayoffGamesArray[0].TeamOneScore : filteredPlayoffGamesArray[0].TeamTwoScore
        teamGameOneScore.textContent = gameOneScore;
        let isTeamOneInGameResult = filteredPlayoffGamesArray[0].TeamOne == teamsNum ? true : false;
        // wins counts to determine if this team wins the series
        let wins = 0;
        let resultBgColor;
        if(isTeamOneInGameResult){
            if (filteredPlayoffGamesArray[0].TeamOneScore > filteredPlayoffGamesArray[0].TeamTwoScore) {
                resultBgColor = "green";
                wins++;
            } else {
                resultBgColor = "red";
            }
        } else {
            if (filteredPlayoffGamesArray[0].TeamTwoScore > filteredPlayoffGamesArray[0].TeamOneScore) {
                resultBgColor = "green";
                wins++
            } else {
                resultBgColor = "red";
            }
        }
        teamGameOneScore.style.backgroundColor = resultBgColor;
        // team one game two score
        const teamGameTwoScore = document.createElement("div")
        teamGameTwoScore.classList.add("teamData")
        const gameTwoScore = (filteredPlayoffGamesArray[1].TeamOne == teamsNum) ? filteredPlayoffGamesArray[1].TeamOneScore : filteredPlayoffGamesArray[1].TeamTwoScore
        teamGameTwoScore.textContent = gameTwoScore
        isTeamOneInGameResult = filteredPlayoffGamesArray[1].TeamOne == teamsNum ? true : false;
        if(isTeamOneInGameResult){
            if (filteredPlayoffGamesArray[1].TeamOneScore > filteredPlayoffGamesArray[1].TeamTwoScore) {
                resultBgColor = "green";
                wins++;
            } else {
                resultBgColor = "red";
            }
        } else {
            if (filteredPlayoffGamesArray[1].TeamTwoScore > filteredPlayoffGamesArray[1].TeamOneScore) {
                resultBgColor = "green";
                wins++
            } else {
                resultBgColor = "red";
            }
        }
        teamGameTwoScore.style.backgroundColor = resultBgColor;
        
        teamGameOne.append(teamName)
        teamGameOne.append(teamGameOneScore)
        teamGameOne.append(teamGameTwoScore)
        
        const wasThirdGamePlayed = filteredPlayoffGamesArray.length;
        if(wasThirdGamePlayed > 2){
            // team one game three score
            const teamGameThreeScore = document.createElement("div")
            const gameThreeScore = (filteredPlayoffGamesArray[2].TeamOne == teamsNum) ? filteredPlayoffGamesArray[2].TeamOneScore : filteredPlayoffGamesArray[1].TeamTwoScore
        teamGameThreeScore.textContent = gameThreeScore
        isTeamOneInGameResult = filteredPlayoffGamesArray[1].TeamOne == teamsNum ? true : false;
        if(isTeamOneInGameResult){
            if (filteredPlayoffGamesArray[2].TeamOneScore > filteredPlayoffGamesArray[2].TeamTwoScore) {
                resultBgColor = "green";
                wins++;
            } else {
                resultBgColor = "red";
            }
        } else {
            if (filteredPlayoffGamesArray[1].TeamTwoScore > filteredPlayoffGamesArray[1].TeamOneScore) {
                resultBgColor = "green";
                wins++
            } else {
                resultBgColor = "red";
            }
        }
        teamGameTwoScore.style.backgroundColor = resultBgColor;
            teamGameOne.append(teamGameThreeScore)
        } else {
            // team one game three score
            const teamGameThreeScore = document.createElement("div")
            teamGameThreeScore.classList.add("teamData")
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
        seriesWinner
    }
    // else return team names with score symbols for yet to be played games
    } else {

            const seriesFrag = document.createDocumentFragment()
        
            const teamGameOne = document.createElement("div");
            teamGameOne.classList.add(teamOneOrTwo)
                // team one name
            const teamName = document.createElement("div")
            teamName.classList.add("teamData")
            teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
            teamName.textContent = `(${teamsStanding}) ` + team.get("Team")
            // team one game one score
            const teamGameOneScore = document.createElement("div")
            teamGameOneScore.classList.add("teamData")
            teamGameOneScore.textContent = "-";
            // team one game two score
            const teamGameTwoScore = document.createElement("div")
            teamGameTwoScore.classList.add("teamData")
            teamGameTwoScore.textContent = "-"
            
            teamGameOne.append(teamName)
            teamGameOne.append(teamGameOneScore)
            teamGameOne.append(teamGameTwoScore)
            // team one game three score
            const teamGameThreeScore = document.createElement("div")
            teamGameThreeScore.classList.add("teamData")
            teamGameThreeScore.textContent = "-"
            teamGameOne.append(teamGameThreeScore)
        
            seriesFrag.append(teamGameOne)
            return seriesFrag
    }
}

export default bestOfSeries;
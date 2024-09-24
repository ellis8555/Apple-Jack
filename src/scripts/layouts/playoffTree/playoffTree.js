import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv"
import clearTablesDiv from "../../tables/clearTablesDiv"
import getTablesDiv from "../../tables/getTablesDiv";
import { GameResults } from "../../../constants/masterHaxData";
import TeamStats from "../../setTables/createTeam";
import sortGroupedStats from "../../misc/sorting/sort";
import teamsColorMAP from "../../var_lib/maps/teams/teamsColorMAP"
import teamsNumMAP from "../../var_lib/maps/teams/teamsNumMAP";

function playoffTree(){
    clearTablesDiv()
    clearScoreboardDiv()

    // get season number from data attribute on playoff menu link
    const seasonNumber = +document.getElementById("testingPlayoffTree").dataset.seasonNumber;
    // get semis playoff games for matching season
    const semiPlayoffGames = GameResults.filter(game => {
        if(game.SeasonNumber === seasonNumber && game.Round === 1){
            return game;
        }
    })
    
    // get finals playoff games for matching season
    const finalPlayoffGames = GameResults.filter(game => {
        if(game.SeasonNumber === seasonNumber && game.Round === 2){
            return game;
        }
    })

    const key = `groupTeamsSeason${seasonNumber}SeasonStats`
    const seasonsFinalStandings = TeamStats[key]
    const sortedFinalStandings = sortGroupedStats(seasonsFinalStandings, "Points")
    // begin constructing the display
    const tablesDiv = getTablesDiv();
    
    // playoff tree container
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-container", "w3-margin", "playoffTree")

    //// semi final 1v4 ////
    const firstPlaceTeam = sortedFinalStandings[0]
    const fourthPlaceTeam = sortedFinalStandings[3]
    // flex container
    const semiDiv1Container = document.createElement("div");
    semiDiv1Container.classList.add("semi1Container")
    // flex container
    const semi1InnerContainer = document.createElement("div")
    semi1InnerContainer.classList.add("semi1")
    // flex containers that contain the series data
    const seriesOne = document.createElement("div");
    seriesOne.classList.add("series")
    // team one flex container
    let team1GameOne = document.createElement("div");
    team1GameOne.classList.add("team1")
        // team one name
    let team1Name = document.createElement("div")
    team1Name.classList.add("teamData")
    team1Name.style.backgroundColor = "#" + teamsColorMAP.get(firstPlaceTeam.get("Team"))
    team1Name.textContent = "(1) " + firstPlaceTeam.get("Team")
    // team one game one score
    let team1GameOneScore = document.createElement("div")
    team1GameOneScore.classList.add("teamData")
    let teamsNum = teamsNumMAP.get(firstPlaceTeam.get("Team"))
    const gameOneScore = semiPlayoffGames[0].TeamOne == teamsNum ? semiPlayoffGames[0].TeamOneScore : semiPlayoffGames[0].TeamTwoScore
    team1GameOneScore.textContent = gameOneScore;
    let isTeamOneInGameResult = semiPlayoffGames[0].TeamOne == teamsNum ? true : false;
    let resultBgColor;
    if(isTeamOneInGameResult){
        semiPlayoffGames[0].TeamOneScore > semiPlayoffGames[0].TeamTwoScore ? resultBgColor = "green" : resultBgColor = "red";
    } else {
        semiPlayoffGames[0].TeamTwoScore > semiPlayoffGames[0].TeamOneScore ? resultBgColor = "green" : resultBgColor = "red";
    }
    team1GameOneScore.style.backgroundColor = resultBgColor;
    // team one game two score
    let team1GameTwoScore = document.createElement("div")
    team1GameTwoScore.classList.add("teamData")
    const gameTwoScore = (semiPlayoffGames[1].TeamOne == teamsNum) ? semiPlayoffGames[1].TeamOneScore : semiPlayoffGames[1].TeamTwoScore
    team1GameTwoScore.textContent = gameTwoScore
    isTeamOneInGameResult = semiPlayoffGames[1].TeamOne == teamsNum ? true : false;
    if(isTeamOneInGameResult){
        semiPlayoffGames[1].TeamOneScore > semiPlayoffGames[1].TeamTwoScore ? resultBgColor = "green" : resultBgColor = "red";
    } else {
        semiPlayoffGames[1].TeamTwoScore > semiPlayoffGames[1].TeamOneScore ? resultBgColor = "green" : resultBgColor = "red";
    }
    team1GameTwoScore.style.backgroundColor = resultBgColor;

    team1GameOne.append(team1Name)
    team1GameOne.append(team1GameOneScore)
    team1GameOne.append(team1GameTwoScore)

    let wasThirdGamePlayed = semiPlayoffGames.length;
    if(wasThirdGamePlayed > 2){
        // team one game three score
        let team1GameThreeScore = document.createElement("div")
        team1GameThreeScore.classList.add("teamData")
        team1GameThreeScore.textContent = 0
        team1GameOne.append(team1GameThreeScore)
    } else {
        // team one game three score
        let team1GameThreeScore = document.createElement("div")
        team1GameThreeScore.classList.add("teamData")
        team1GameThreeScore.textContent = "-"
        team1GameOne.append(team1GameThreeScore)
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////
    // team two first game score
    // team flex flex container
    let team2GameOne = document.createElement("div");
    team2GameOne.classList.add("team2")
        // team one name
    let team2Name = document.createElement("div")
    team2Name.classList.add("teamData")
    team2Name.style.backgroundColor = "#" + teamsColorMAP.get(fourthPlaceTeam.get("Team"))
    team2Name.textContent = "(4) " + fourthPlaceTeam.get("Team")
    // team one game one score
    let team2GameOneScore = document.createElement("div")
    team2GameOneScore.classList.add("teamData")
    teamsNum = teamsNumMAP.get(fourthPlaceTeam.get("Team"))
    const gameOneScoreSecondTeam = semiPlayoffGames[0].TeamOne == teamsNum ? semiPlayoffGames[0].TeamOneScore : semiPlayoffGames[0].TeamTwoScore
    team2GameOneScore.textContent = gameOneScoreSecondTeam
    let isTeamTwoInGameResult = semiPlayoffGames[0].TeamOne == teamsNum ? true : false;
    resultBgColor;
    if(isTeamTwoInGameResult){
        semiPlayoffGames[0].TeamOneScore > semiPlayoffGames[0].TeamTwoScore ? resultBgColor = "green" : resultBgColor = "red";
    } else {
        semiPlayoffGames[0].TeamTwoScore > semiPlayoffGames[0].TeamOneScore ? resultBgColor = "green" : resultBgColor = "red";
    }
    team2GameOneScore.style.backgroundColor = resultBgColor;
    // team one game two score
    let team2GameTwoScore = document.createElement("div")
    team2GameTwoScore.classList.add("teamData")
    const gameTwoScoreSecondTeam = semiPlayoffGames[1].TeamOne == teamsNum ? semiPlayoffGames[1].TeamOneScore : semiPlayoffGames[1].TeamTwoScore
    team2GameTwoScore.textContent = gameTwoScoreSecondTeam
    isTeamTwoInGameResult = semiPlayoffGames[1].TeamOne == teamsNum ? true : false;
    if(isTeamTwoInGameResult){
        semiPlayoffGames[1].TeamOneScore > semiPlayoffGames[1].TeamTwoScore ? resultBgColor = "green" : resultBgColor = "red";
    } else {
        semiPlayoffGames[1].TeamTwoScore > semiPlayoffGames[1].TeamOneScore ? resultBgColor = "green" : resultBgColor = "red";
    }
    team2GameTwoScore.style.backgroundColor = resultBgColor;

    team2GameOne.append(team2Name)
    team2GameOne.append(team2GameOneScore)
    team2GameOne.append(team2GameTwoScore)

    wasThirdGamePlayed = semiPlayoffGames.length;
    if(wasThirdGamePlayed > 2){
        // team one game three score
        let team2GameThreeScore = document.createElement("div")
        team2GameThreeScore.classList.add("teamData")
        team2GameThreeScore.textContent = 0
        team2GameOne.append(team2GameThreeScore)
    } else {
        // team one game three score
        let team2GameThreeScore = document.createElement("div")
        team2GameThreeScore.classList.add("teamData")
        team2GameThreeScore.textContent = "-"
        team2GameOne.append(team2GameThreeScore)
    }
    
    // append each teams row of results
    seriesOne.append(team1GameOne)
    seriesOne.append(team2GameOne)
    semi1InnerContainer.append(seriesOne)
    semiDiv1Container.append(semi1InnerContainer)

    //// semi final 2v3 ////
    const secondPlaceTeam = sortedFinalStandings[1]
    const thirdPlaceTeam = sortedFinalStandings[2]
    const semiDiv2Container = document.createElement("div");
    semiDiv2Container.classList.add( "semi2Container")
    const semi2InnerContainer = document.createElement("div")
    semi2InnerContainer.classList.add("semi2")
    const team2Container = document.createElement("div");
    team2Container.classList.add("team")
    semi2InnerContainer.textContent = `${secondPlaceTeam.get("Team")} vs ${thirdPlaceTeam.get("Team")}`
    semiDiv2Container.append(semi2InnerContainer)
    
    // finals container
    const finalsContainer = document.createElement("div");
    finalsContainer.classList.add("finalsContainer")
    const finalsDiv = document.createElement("div");
    finalsDiv.style.backgroundColor = "green"
    finalsDiv.innerHTML = "Playoff tree in early development.<br>NOT mobile friendly yet<br>Work in progress"
    
    finalsContainer.append(finalsDiv)

    containerElem.append(semiDiv1Container, semiDiv2Container, finalsContainer)

    tablesDiv.append(containerElem)
}

export default playoffTree
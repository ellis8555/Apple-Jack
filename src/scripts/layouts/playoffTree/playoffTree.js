import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv"
import clearTablesDiv from "../../tables/clearTablesDiv"
import getTablesDiv from "../../tables/getTablesDiv";
import { GameResults } from "../../../constants/masterHaxData";
import TeamStats from "../../setTables/createTeam";
import sortGroupedStats from "../../misc/sorting/sort";
import bestOfSeries from "./componenets/bestOfSeries";
import setMainNavbar from "../navbar/setMainNavbar";
import setHeaderBanner from "../setHeaderBanner";
import { CHAMPIONS_LIST, IN_BETWEEN_SEASONS, CURRENT_SEASON_PLAYOFF_TEAMS_COUNT } from "../../../constants/consts/vars";
import createElement from "../../misc/createElement";
import seriesContainer from "./componenets/seriesContainer";
import COLORS from "../../../constants/consts/colors";
import seriesBye from "./componenets/seriesBye";
import currentSeason from "../../var_lib/season/currentSeason";
import singleGameSeriesContainer from "./componenets/singleGameSeriesContainer";

function playoffTree(seasonNumber){
    clearTablesDiv()
    clearScoreboardDiv()
    document.body.style.backgroundColor = COLORS["w3-blue"]
    // get season number from data attribute on playoff menu link
    let championsListElement;
    if(seasonNumber == currentSeason){
        championsListElement = seasonNumber-2
        if(IN_BETWEEN_SEASONS){
            championsListElement = seasonNumber-1
        }
    } else {
        championsListElement = seasonNumber - 1 
    }
    setHeaderBanner(CHAMPIONS_LIST[championsListElement], seasonNumber == currentSeason ? (IN_BETWEEN_SEASONS ? seasonNumber : seasonNumber-1) : seasonNumber)
    setMainNavbar(seasonNumber)
    // get playoff games for matching season
    const firstRoundGames = GameResults.filter(game => game.SeasonNumber === seasonNumber && game.Round === 1)
    const secondRoundGames = GameResults.filter(game => game.SeasonNumber === seasonNumber && game.Round === 2)
    const firstAndSecondRoundGames = [...firstRoundGames, ...secondRoundGames]
    // use to determine which round numbers are which series. example semi's or final's
    const countOfTeamsInPlayoffs = new Set(firstAndSecondRoundGames.flatMap(game => [game.TeamOne, game.TeamTwo])).size
    let finalsRoundNumber;
    let semisRoundNumber;
    let playoffTreeClass
    switch(countOfTeamsInPlayoffs){
        case 3:
            semisRoundNumber = 1;
            finalsRoundNumber = 2;
            playoffTreeClass = "playoffTreeThreeTeams"
        break;
        case 4:
            semisRoundNumber = 1;
            finalsRoundNumber = 2;
            playoffTreeClass = "playoffTreeFourTeams"
        break;
        case 5:
            semisRoundNumber = 2;
            finalsRoundNumber = 3;
            playoffTreeClass = "playoffTreeFiveTeams"
        break;
    }
    const key = `groupTeamsSeason${seasonNumber}SeasonStats`
    const seasonsFinalStandings = TeamStats[key]
    const sortedFinalStandings = sortGroupedStats(seasonsFinalStandings, "Points")
    // begin constructing the display
    const tablesDiv = getTablesDiv();
    // playoff tree grid container
    const containerElem = createElement("div", "w3-container", playoffTreeClass)
    const playoffsAnnouncementContainer = createElement("div", "playoffAnnouncement")
    playoffsAnnouncementContainer.innerHTML = `<h3>Season ${seasonNumber} playoffs</h3>`
    containerElem.append(playoffsAnnouncementContainer)

    // first round title
    const firstRoundTitleContainer = createElement("div", "firstRound")
    const firstRoundTitleHeadElement = createElement("h4");
    firstRoundTitleHeadElement.textContent = "Round One"
    firstRoundTitleContainer.append(firstRoundTitleHeadElement)
    containerElem.append(firstRoundTitleContainer)

    // if three rounds
    if(countOfTeamsInPlayoffs === 5){
        const secondRoundTitleContainer = createElement("div", "secondRound")
        const secondRoundTitleHeadElement = createElement("h4");
        secondRoundTitleHeadElement.textContent = "Round Robin"
        secondRoundTitleContainer.append(secondRoundTitleHeadElement)
        containerElem.append(secondRoundTitleContainer)
    }

    // final round title
    const finalRoundTitleContainer = createElement("div", "finalRound")
    const finalRoundTitleHeadElement = createElement("h4")
    finalRoundTitleHeadElement.textContent = "Championship"
    finalRoundTitleContainer.append(finalRoundTitleHeadElement)
    containerElem.append(finalRoundTitleContainer)
    // build the series tree dependant on how many teams are in the playoffs for that particular season
    // first round in playoff format that contains 3 teams
    if(countOfTeamsInPlayoffs == 3){
        // team with bye
        const {
            byeContainer,
            seriesTeam1Results: firstSeriesTeam1Results
        } = seriesBye(sortedFinalStandings[0], seasonNumber)

                        //// semi final 2v3 ////
        const seriesTwoContainerArgs = {
            teamOne: sortedFinalStandings[1],
            teamOneRank: 2,
            teamTwo: sortedFinalStandings[2],
            teamTwoRank: 3,
            gamesArray: firstRoundGames,
            seriesNum: 2,
            seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: semiDiv2Container,
            seriesTeam1Results: secondSeriesTeam1Results, 
            seriesTeam2Results: secondSeriesTeam2Results
        } = seriesContainer(seriesTwoContainerArgs);

                  // get finals playoff games for matching season
        const finalPlayoffGames = GameResults.filter(game => game.SeasonNumber === seasonNumber && game.Round === finalsRoundNumber)
        // finals container
        const finalsContainer = createElement("div", "finalsContainer")
        const finalsDivInnerContainer = createElement("div", "semi2")
        const finalSeries = createElement("div", "series")
        
        // get the finalists index in sorted standings in order to be passed into the finalists bestOfSeries call
        const seriesOneWinner = firstSeriesTeam1Results.seriesWinner
        const seriesTwoWinner = secondSeriesTeam1Results.seriesWinner ?? secondSeriesTeam2Results.seriesWinner;
        const seriesOneWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesOneWinner)
        const seriesTwoWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesTwoWinner)
        // team one flex container
        const finalSeriesTeam1Results = bestOfSeries(seasonNumber, sortedFinalStandings[seriesOneWinnerInFinalStandings], finalPlayoffGames, "team1", seriesOneWinnerInFinalStandings, true);
        // team two flex container
        const finalSeriesTeam2Results = bestOfSeries(seasonNumber, sortedFinalStandings[seriesTwoWinnerInFinalStandings], finalPlayoffGames, "team2", seriesTwoWinnerInFinalStandings, true);
        // append state of series such as series winner or tied at 0-0
        const seriesWinner = finalSeriesTeam1Results.seriesWinner ?? finalSeriesTeam2Results.seriesWinner;
        const seriesLosersWins = Math.min(finalSeriesTeam1Results.wins, finalSeriesTeam2Results.wins)
        const finaSeriesStatusContainer = createElement("div")
        if(seriesWinner && seriesLosersWins != null){
            finaSeriesStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
        } else {
            finaSeriesStatusContainer.textContent = `Series (0 - 0)`;
        }
        // only append the series status if both teams are determined
        if(seriesOneWinner && seriesTwoWinner){
            finalSeries.append(finaSeriesStatusContainer)
        }
        finalSeries.append(finalSeriesTeam1Results.seriesFrag)
        finalSeries.append(finalSeriesTeam2Results.seriesFrag)
        finalsDivInnerContainer.append(finalSeries)
        finalsContainer.append(finalsDivInnerContainer)
        // append each series to playoffs grid layout
        containerElem.append(byeContainer, semiDiv2Container, finalsContainer)
        
        // if both finalists are set but no games have been played then append dashes in place of scores
        if(seriesOneWinner && seriesTwoWinner){
            if(finalPlayoffGames.length == 0){
                    setTimeout(() => {
                        for(let i = 1; i<=2; i++){
                            let getFinalsContainer = document.querySelector(`.finalsContainer .team${i}`)
                                for(let j = 0; j<=2; j++){
                                    const teamOneFinalsScoreHolder = createElement("div", "teamData")
                                    teamOneFinalsScoreHolder.textContent = "-";
                                    getFinalsContainer.append(teamOneFinalsScoreHolder)
                                }
                        }
                    }, 0)
                }
            }
    }
    // first round in playoff format that contains 4 teams
    if(countOfTeamsInPlayoffs == 4){
        //// semi final 1v4 ////
        const seriesOneContainerArgs = {
            teamOne: sortedFinalStandings[0],
            teamOneRank: 1,
            teamTwo: sortedFinalStandings[3],
            teamTwoRank: 4,
            gamesArray: firstRoundGames,
            seriesNum: 1,
            seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: semiDiv1Container,
            seriesTeam1Results: firstSeriesTeam1Results, 
            seriesTeam2Results: firstSeriesTeam2Results
        } = seriesContainer(seriesOneContainerArgs);

        //// semi final 2v3 ////
        const seriesTwoContainerArgs = {
            teamOne: sortedFinalStandings[1],
            teamOneRank: 2,
            teamTwo: sortedFinalStandings[2],
            teamTwoRank: 3,
            gamesArray: firstRoundGames,
            seriesNum: 2,
            seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: semiDiv2Container,
            seriesTeam1Results: secondSeriesTeam1Results, 
            seriesTeam2Results: secondSeriesTeam2Results
        } = seriesContainer(seriesTwoContainerArgs);

        // get finals playoff games for matching season
        const finalPlayoffGames = GameResults.filter(game => game.SeasonNumber === seasonNumber && game.Round === finalsRoundNumber)
        // finals container
        const finalsContainer = createElement("div", "finalsContainer")
        const finalsDivInnerContainer = createElement("div", "semi2")
        const finalSeries = createElement("div", "series")
        
        // get the finalists index in sorted standings in order to be passed into the finalists bestOfSeries call
        const seriesOneWinner = firstSeriesTeam1Results.seriesWinner ?? firstSeriesTeam2Results.seriesWinner;
        const seriesTwoWinner = secondSeriesTeam1Results.seriesWinner ?? secondSeriesTeam2Results.seriesWinner;
        const seriesOneWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesOneWinner)
        const seriesTwoWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesTwoWinner)
        // team one flex container
        const finalSeriesTeam1Results = bestOfSeries(seasonNumber, sortedFinalStandings[seriesOneWinnerInFinalStandings], finalPlayoffGames, "team1", seriesOneWinnerInFinalStandings, true);
        // team two flex container
        const finalSeriesTeam2Results = bestOfSeries(seasonNumber, sortedFinalStandings[seriesTwoWinnerInFinalStandings], finalPlayoffGames, "team2", seriesTwoWinnerInFinalStandings, true);
        // append state of series such as series winner or tied at 0-0
        const seriesWinner = finalSeriesTeam1Results.seriesWinner ?? finalSeriesTeam2Results.seriesWinner;
        const seriesLosersWins = Math.min(finalSeriesTeam1Results.wins, finalSeriesTeam2Results.wins)
        const finaSeriesStatusContainer = createElement("div")
        if(seriesWinner && seriesLosersWins != null){
            finaSeriesStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
        } else {
            finaSeriesStatusContainer.textContent = `Series (0 - 0)`;
        }
        // only append the series status if both teams are determined
        if(seriesOneWinner && seriesTwoWinner){
            finalSeries.append(finaSeriesStatusContainer)
        }
        // correctly order higher standing team in final series in playoff tree
        if(seriesOneWinnerInFinalStandings < seriesTwoWinnerInFinalStandings){
            finalSeries.append(finalSeriesTeam1Results.seriesFrag)
            finalSeries.append(finalSeriesTeam2Results.seriesFrag)
        } else {
            finalSeries.append(finalSeriesTeam2Results.seriesFrag)
            finalSeries.append(finalSeriesTeam1Results.seriesFrag)
        }
        finalsDivInnerContainer.append(finalSeries)
        finalsContainer.append(finalsDivInnerContainer)
        // append each series to playoffs grid layout
        containerElem.append(semiDiv1Container, semiDiv2Container, finalsContainer)
        
        // if both finalists are set but no games have been played then append dashes in place of scores
        if(seriesOneWinner && seriesTwoWinner){
            if(finalPlayoffGames.length == 0){
                    setTimeout(() => {
                        for(let i = 1; i<=2; i++){
                            let getFinalsContainer = document.querySelector(`.finalsContainer .team${i}`)
                                for(let j = 0; j<=2; j++){
                                    const teamOneFinalsScoreHolder = createElement("div", "teamData")
                                    teamOneFinalsScoreHolder.textContent = "-";
                                    getFinalsContainer.append(teamOneFinalsScoreHolder)
                                }
                        }
                    }, 0)
                }
            }
    }
    // first round in playoff format that contains 5 teams
    if(countOfTeamsInPlayoffs == 5){
        // get round robin playoff games for matching season
        const roundRobinPlayoffGames = GameResults.filter(game => game.SeasonNumber === seasonNumber && game.Round === 2)
        // team with bye
        const {
            byeContainer,
            seriesTeam1Results: firstSeriesTeam1Results
        } = seriesBye(sortedFinalStandings[1], seasonNumber)

        //// first round 2v5 ////
        const seriesOneContainerArgs = {
            teamOne: sortedFinalStandings[0],
            teamOneRank: 2,
            teamTwo: sortedFinalStandings[4],
            teamTwoRank: 5,
            gamesArray: firstRoundGames,
            seriesNum: 1,
            seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: firstRoundDiv1Container,
            seriesTeam1Results: secondSeriesTeam1Results, 
            seriesTeam2Results: secondSeriesTeam2Results
        } = seriesContainer(seriesOneContainerArgs);

        //// first round 3v4 ////
        const seriesTwoContainerArgs = {
            teamOne: sortedFinalStandings[2],
            teamOneRank: 3,
            teamTwo: sortedFinalStandings[3],
            teamTwoRank: 4,
            gamesArray: firstRoundGames,
            seriesNum: 2,
            seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: firstRoundDiv2Container,
            seriesTeam1Results: thirdSeriesTeam1Results, 
            seriesTeam2Results: thirdSeriesTeam2Results
        } = seriesContainer(seriesTwoContainerArgs);

        // round robin container
        //// second round game one ////
        const secondRoundGameOneContainerArgs = {
            teamOne: sortedFinalStandings[0],
            teamOneRank: 2,
            teamTwo: sortedFinalStandings[2],
            teamTwoRank: 3,
            gamesArray: roundRobinPlayoffGames[0],
            seriesNum: 1,
            seasonNumber: seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: secondRoundDiv1Container,
        } = singleGameSeriesContainer(secondRoundGameOneContainerArgs);

        //// second round game two ////
        const secondRoundGameTwoContainerArgs = {
            teamOne: sortedFinalStandings[1],
            teamOneRank: 1,
            teamTwo: sortedFinalStandings[2],
            teamTwoRank: 3,
            gamesArray: roundRobinPlayoffGames[1],
            seriesNum: 2,
            seasonNumber: seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: secondRoundDiv2Container,
        } = singleGameSeriesContainer(secondRoundGameTwoContainerArgs);

        //// second round game three ////
        const secondRoundGameThreeContainerArgs = {
            teamOne: sortedFinalStandings[1],
            teamOneRank: 1,
            teamTwo: sortedFinalStandings[0],
            teamTwoRank: 2,
            gamesArray: roundRobinPlayoffGames[2],
            seriesNum: 3,
            seasonNumber, seasonNumber
        }
        // returns dom container for a single series
        const {
            semiDivContainer: secondRoundDiv3Container,
        } = singleGameSeriesContainer(secondRoundGameThreeContainerArgs);

        // get finals playoff games for matching season
        const finalPlayoffGames = GameResults.filter(game => game.SeasonNumber === seasonNumber && game.Round === finalsRoundNumber)
        // finals container
        const finalsContainer = createElement("div", "finalsContainer")
        const finalsDivInnerContainer = createElement("div", "semi2")
        const finalSeries = createElement("div", "series")
        
        // get the finalists index in sorted standings in order to be passed into the finalists bestOfSeries call
        const seriesOneWinner = "Orange Ricky"
        const seriesTwoWinner = "Haxual Chocolate"
        const seriesOneWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesOneWinner)
        const seriesTwoWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesTwoWinner)
        // team one flex container
        const finalSeriesTeam1Results = bestOfSeries(seasonNumber, sortedFinalStandings[seriesOneWinnerInFinalStandings], finalPlayoffGames, "team1", seriesOneWinnerInFinalStandings, true);
        // team two flex container
        const finalSeriesTeam2Results = bestOfSeries(seasonNumber, sortedFinalStandings[seriesTwoWinnerInFinalStandings], finalPlayoffGames, "team2", seriesTwoWinnerInFinalStandings, true);
        // append state of series such as series winner or tied at 0-0
        const seriesWinner = finalSeriesTeam1Results.seriesWinner ?? finalSeriesTeam2Results.seriesWinner;
        const seriesLosersWins = Math.min(finalSeriesTeam1Results.wins, finalSeriesTeam2Results.wins)
        const finaSeriesStatusContainer = createElement("div")
        if(seriesWinner && seriesLosersWins != null){
            finaSeriesStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
        } else {
            finaSeriesStatusContainer.textContent = `Series (0 - 0)`;
        }
        // only append the series status if both teams are determined
        if(seriesOneWinner && seriesTwoWinner){
            finalSeries.append(finaSeriesStatusContainer)
        }
        finalSeries.append(finalSeriesTeam1Results.seriesFrag)
        finalSeries.append(finalSeriesTeam2Results.seriesFrag)
        finalsDivInnerContainer.append(finalSeries)
        finalsContainer.append(finalsDivInnerContainer)
        
        // if both finalists are set but no games have been played then append dashes in place of scores
        if(seriesOneWinner && seriesTwoWinner){
            if(finalPlayoffGames.length == 0){
                    setTimeout(() => {
                        for(let i = 1; i<=2; i++){
                            let getFinalsContainer = document.querySelector(`.finalsContainer .team${i}`)
                                for(let j = 0; j<=2; j++){
                                    const teamOneFinalsScoreHolder = createElement("div", "teamData")
                                    teamOneFinalsScoreHolder.textContent = "-";
                                    getFinalsContainer.append(teamOneFinalsScoreHolder)
                                }
                        }
                    }, 0)
                }
            }

        // append each series to playoffs grid layout
        containerElem.append(byeContainer, firstRoundDiv1Container, firstRoundDiv2Container, secondRoundDiv1Container, secondRoundDiv2Container, secondRoundDiv3Container, finalsContainer)
    }
    tablesDiv.append(containerElem)
}

export default playoffTree
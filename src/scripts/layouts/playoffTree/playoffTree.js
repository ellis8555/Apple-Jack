import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv"
import clearTablesDiv from "../../tables/clearTablesDiv"
import getTablesDiv from "../../tables/getTablesDiv";
import { GameResults } from "../../../constants/masterHaxData";
import TeamStats from "../../setTables/createTeam";
import sortGroupedStats from "../../misc/sorting/sort";
import bestOfSeries from "./componenets/bestOfSeries";
import setMainNavbar from "../navbar/setMainNavbar";
import setHeaderBanner from "../setHeaderBanner";
import { DEFENDING_CHAMPS } from "../../../constants/consts/vars";
import currentSeason from "../../var_lib/season/currentSeason";

function playoffTree(){
    clearTablesDiv()
    clearScoreboardDiv()
    // get season number from data attribute on playoff menu link
    const seasonNumber = +currentSeason
    setHeaderBanner(DEFENDING_CHAMPS, seasonNumber-1)
    setMainNavbar(seasonNumber)
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
    
    // playoff tree grid container
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-container", "playoffTree")

    const playoffsAnnouncementContainer = document.createElement("div");
    playoffsAnnouncementContainer.classList.add("playoffAnnouncement")
    playoffsAnnouncementContainer.innerHTML = "<h3>Season 4 playoff tree</h3> <p>Playoff tree in development</p>"
    containerElem.append(playoffsAnnouncementContainer)

    // first round title
    const firstRoundTitleContainer = document.createElement("div");
    firstRoundTitleContainer.classList.add("firstRound")
    const firstRoundTitleHeadElement = document.createElement("h4")
    firstRoundTitleHeadElement.textContent = "Round One"
    firstRoundTitleContainer.append(firstRoundTitleHeadElement)
    containerElem.append(firstRoundTitleContainer)

        // final round title
        const finalRoundTitleContainer = document.createElement("div");
        finalRoundTitleContainer.classList.add("finalRound")
        const finalRoundTitleHeadElement = document.createElement("h4")
        finalRoundTitleHeadElement.textContent = "Championship"
        finalRoundTitleContainer.append(finalRoundTitleHeadElement)
        containerElem.append(finalRoundTitleContainer)

    //// semi final 1v4 ////
    const firstPlaceTeam = sortedFinalStandings[0]
    const fourthPlaceTeam = sortedFinalStandings[3]
    // flex container for alignments
    const semiDiv1Container = document.createElement("div");
    semiDiv1Container.classList.add("semi1Container")
    // flex container for alignments
    const semi1InnerContainer = document.createElement("div")
    semi1InnerContainer.classList.add("semi1")
    // flex containers that contain the series data
    const seriesOne = document.createElement("div");
    seriesOne.classList.add("series")
    // team one flex container
    const firstSeriesTeam1Results = bestOfSeries(firstPlaceTeam, semiPlayoffGames, "team1", 1)
    // team two flex container
    const firstSeriesTeam2Results = bestOfSeries(fourthPlaceTeam, semiPlayoffGames, "team2", 4)
    // append state of series such as series winner or tied at 0-0
    let seriesWinner = firstSeriesTeam1Results.seriesWinner ?? firstSeriesTeam2Results.seriesWinner;
    let seriesLosersWins = Math.min(firstSeriesTeam1Results.wins, firstSeriesTeam2Results.wins)
    const seriesOneStatusContainer = document.createElement("div")
    if(seriesWinner && seriesLosersWins != null){
        seriesOneStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
    } else {
        seriesOneStatusContainer.textContent = `Series to be played`;
    }

    // append each teams row of results
    seriesOne.append(seriesOneStatusContainer)
    seriesOne.append(firstSeriesTeam1Results.seriesFrag)
    seriesOne.append(firstSeriesTeam2Results.seriesFrag)
    semi1InnerContainer.append(seriesOne)
    semiDiv1Container.append(semi1InnerContainer)

    //// semi final 2v3 ////
    const secondPlaceTeam = sortedFinalStandings[1]
    const thirdPlaceTeam = sortedFinalStandings[2]
        // flex container for alignments
    const semiDiv2Container = document.createElement("div");
    semiDiv2Container.classList.add( "semi2Container")
        // flex container for alignments
    const semi2InnerContainer = document.createElement("div")
    semi2InnerContainer.classList.add("semi2")
       // flex containers that contain the series data
    const seriesTwo = document.createElement("div")
    seriesTwo.classList.add("series")
    // team one flex container
    const secondSeriesTeam1Results = bestOfSeries(secondPlaceTeam, semiPlayoffGames, "team1", 2)
    // team two flex container
    const secondSeriesTeam2Results = bestOfSeries(thirdPlaceTeam, semiPlayoffGames, "team2", 3)
        // append state of series such as series winner or tied at 0-0
        seriesWinner = secondSeriesTeam1Results.seriesWinner ?? secondSeriesTeam2Results.seriesWinner;
        seriesLosersWins = Math.min(secondSeriesTeam1Results.wins, secondSeriesTeam2Results.wins)
        const seriesTwoStatusContainer = document.createElement("div")
        if(seriesWinner && seriesLosersWins != null){
            seriesTwoStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
        } else {
            seriesTwoStatusContainer.textContent = `Series (0 - 0)`;
        }
    // append each teams row of results
    seriesTwo.append(seriesTwoStatusContainer)
    seriesTwo.append(secondSeriesTeam1Results)
    seriesTwo.append(secondSeriesTeam2Results)
    semi2InnerContainer.append(seriesTwo)
    semiDiv2Container.append(semi2InnerContainer)

    // finals container
    const finalsContainer = document.createElement("div");
    finalsContainer.classList.add("finalsContainer")
    const finalsDiv = document.createElement("div");
    finalsDiv.classList.add("semi2Container")
    const finalsDivInnerContainer = document.createElement("div");
    finalsDivInnerContainer.classList.add("semi2")
    const finalSeries = document.createElement("div");
    finalSeries.classList.add("series");
    
    // get the finalists index in sorted standings in order to be passed into the finalists bestOfSeries call
    const seriesOneWinner = firstSeriesTeam1Results.seriesWinner ?? firstSeriesTeam2Results.seriesWinner;
    const seriesTwoWinner = secondSeriesTeam1Results.seriesWinner ?? secondSeriesTeam2Results.seriesWinner;
    const seriesOneWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesOneWinner)
    const seriesTwoWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesTwoWinner)

    // team one flex container
    const finalSeriesTeam1Results = bestOfSeries(sortedFinalStandings[seriesOneWinnerInFinalStandings], finalPlayoffGames, "team1", seriesOneWinnerInFinalStandings, true);
    // team two flex container
    const finalSeriesTeam2Results = bestOfSeries(sortedFinalStandings[seriesTwoWinnerInFinalStandings], finalPlayoffGames, "team2", seriesTwoWinnerInFinalStandings, true);

    finalSeries.append(finalSeriesTeam1Results.seriesFrag)
    finalSeries.append(finalSeriesTeam2Results.seriesFrag)
    finalsDivInnerContainer.append(finalSeries)
    finalsContainer.append(finalsDivInnerContainer)


    // append each series to playoffs grid layout
    containerElem.append(semiDiv1Container, semiDiv2Container, finalsContainer)

    tablesDiv.append(containerElem)
}

export default playoffTree
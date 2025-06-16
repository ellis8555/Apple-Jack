import bestOfSeries from "./bestOfSeries";
import createElement from "../../../misc/createElement";

function seriesContainer({teamOne, teamOneRank, teamTwo, teamTwoRank, gamesArray, seriesNum, seasonNumber}){
    // flex container for alignments
    const semiDivContainer = createElement("div", `semi${seriesNum}Container`)
    // flex container for alignments
    const semiInnerContainer = createElement("div", `semi${seriesNum}`)
    // flex containers that contain the series data
    const series = createElement("div", "series")
    // team one flex container
    const seriesTeam1Results = bestOfSeries(seasonNumber, teamOne, gamesArray, "team1", teamOneRank)
    // team two flex container
    const seriesTeam2Results = bestOfSeries(seasonNumber, teamTwo, gamesArray, "team2", teamTwoRank)
    // append state of series such as series winner or tied at 0-0
    const seriesWinner = seriesTeam1Results.seriesWinner ?? seriesTeam2Results.seriesWinner;
    const seriesLosersWins = Math.min(seriesTeam1Results.wins, seriesTeam2Results.wins)
    const seriesStatusContainer = createElement("div")
    if(seriesWinner && seriesLosersWins != null){
        seriesStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
    } else {
        seriesStatusContainer.textContent = `Series to be played`;
    }

    // append each teams row of results
    series.append(seriesStatusContainer)
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

export default seriesContainer;
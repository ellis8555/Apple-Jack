import getSelectValues from "./getSelectValues";
import clearScoreboardDiv from "../../../scoreboard/clearScoreboardDiv";
import getScoreboardDiv from "../../../scoreboard/getScoreboardDiv"
import { GameResults, GamePlayerStats } from "../../../../constants/masterHaxData";
import playersMAP from "../../../var_lib/maps/players/playersMAP";
import { Teams } from "../../../../constants/masterHaxData";

function showSelectedRecords(){
    clearScoreboardDiv()
    const scoreboardDiv = getScoreboardDiv()
    const {type, mode, seasonNumber, category, per} = getSelectValues()

    const recordStat = getStat({type, mode, seasonNumber, category, per})

    let template
    if(recordStat){
        const tableCaption = createTableCaption({type, mode, seasonNumber, category, per})
        let recordHTML = `
            <table id="recordsTable">
                <caption>${tableCaption}</caption>
                <thead>
                    <th>Player</th>
                    <th>${category}</th>
                    <th>Vs</th>
                    ${seasonNumber === "all" ? "<th>Season</th>" : ""}
                </thead>
                <tbody>
            `
        recordStat.forEach(record => {         
            const gamesRecord = GameResults.find(game => game.GameID === record.GameID)
            const getOpponenentsTeamID = gamesRecord.TeamOne === record.TeamID ? gamesRecord.TeamTwo : gamesRecord.TeamOne
            const getOpponenentsTeamObject = Teams.find(team => team.TeamID === getOpponenentsTeamID) 
            const getOpponentsTeamName = getOpponenentsTeamObject["TeamName"]
            recordHTML += `
                            <tr>
                                <td>${playersMAP.get(record.PlayerID)}</td>
                                <td>${category === "Goals" ? record.Goals : category === "Assists" ?  record.Assists: ""}</td>
                                <td>${getOpponentsTeamName}</td>
                                ${seasonNumber === "all" ? "<td>"+ gamesRecord.SeasonNumber + "</td>" : ""}
                            </tr>`
        })
        recordHTML += `
                </tbody>
                </thead>
            </table>
        `
        template = document.createElement('template')
        template.innerHTML = recordHTML
    } else {
        template = document.createElement('template')
        template.innerHTML = `
            <p>Stat currently unavailable</p>
        `
    }

    const clonedNode = template.content.cloneNode(true)
    scoreboardDiv.append(clonedNode)

}

// function that returns the stat and based on either team or player type record
function getStat({type, mode, seasonNumber, category, per}){
    if(type === "player"){
        return getPlayerRecord({mode, seasonNumber, category, per})
    } else {
        return getTeamRecord({mode, seasonNumber, category, per})
    }
}

// player type records
function getPlayerRecord({mode, seasonNumber, category, per}){
    let filteredStats
    const gamesList = getGameIdsBySeason(mode, +seasonNumber)
    const extractedGameIds = extractGameIds(gamesList)
    filteredStats = getPlayersGameObjects({category, per}, extractedGameIds)

    return filteredStats
}

// team type records
function getTeamRecord({mode, seasonNumber, category, per}){

}

// filter games list based on season number
function getGameIdsBySeason(mode, seasonNumber = "all"){
    let seasonFiltered
    if(!isNaN(seasonNumber)){
        seasonFiltered = GameResults.filter(game => game.SeasonNumber === seasonNumber)
    } else {
        seasonFiltered = GameResults
    }

    // filter out games by mode
    let filteredByMode
    switch(mode){
        case "all":
            filteredByMode = seasonFiltered
        break;
        case "season":
            filteredByMode = seasonFiltered.filter(game => game.Round === 0)
        break;
        case "playoff":
            filteredByMode = seasonFiltered.filter(game => game.Round !== 0)
        break;
        default:
            filteredByMode = seasonFiltered
    }

    return filteredByMode
}


// collect game id's into an array
function extractGameIds(gamesList){
    return gamesList.map(game => game.GameID)
}

// get player requested stat by category
function getPlayersGameObjects({category, per}, gameIdsArray){
    const getPlayersGameDataByGamesId = GamePlayerStats.filter(playersGame => {
        if(gameIdsArray.includes(playersGame.GameID)){
            return playersGame
        }
    })

    let recordStat
    if(per === "game"){
       recordStat = getRequestedGameStat({category}, getPlayersGameDataByGamesId, true).slice(0, 5)
    }

    if(per === "season"){
        recordStat = null
    }

    return recordStat
}

// extract requested game stat
function getRequestedGameStat({category},dataArray, isSingleGame){
    let recordStat
    if(isSingleGame){
        recordStat = dataArray.sort((a,b) => b[category] - a[category])
    } else {
        recordStat = null
    }

    return recordStat
}

// function create table caption
function createTableCaption({type, mode, seasonNumber, category, per}){
    if(type === "player"){
        if(mode === "all" && seasonNumber === "all"){
            return `All time record for ${category.toLowerCase()} in a ${per}`
        }
        if(mode === "season" && seasonNumber === "all"){
            return `All time season game record for ${category.toLowerCase()} in a ${per}`
        }
        if(mode === "playoff" && seasonNumber === "all"){
            return `All time playoff game record for ${category.toLowerCase()} in a ${per}`
        }
        if(mode === "all" && seasonNumber !== "all"){
            return `Season ${seasonNumber} record for ${category.toLowerCase()} in either season or playoff ${per}`
        }
        if(mode === "season" && seasonNumber !== "all"){
            return `Season ${seasonNumber} record for ${category.toLowerCase()} in a season ${per}`
        }
        if(mode === "playoff" && seasonNumber !== "all"){
            return `Season ${seasonNumber} record for ${category.toLowerCase()} in a playoff ${per}`
        }
    }

    return "If you see this a table caption scenario has been missed"
}

export default showSelectedRecords
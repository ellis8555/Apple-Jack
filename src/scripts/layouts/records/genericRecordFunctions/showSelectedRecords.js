import getSelectValues from "./getSelectValues";
import clearScoreboardDiv from "../../../scoreboard/clearScoreboardDiv";
import getScoreboardDiv from "../../../scoreboard/getScoreboardDiv"
import { GameResults, GamePlayerStats } from "../../../../constants/masterHaxData";
import playersMAP from "../../../var_lib/maps/players/playersMAP";
import { Teams } from "../../../../constants/masterHaxData";
import IndividualPlayerStats from "../../../classFiles/players/individualPlayerStats"
import seasonCount from "../../../var_lib/season/seasonCount";

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
                    <th>Season</th>
                    ${per === "season" ? "" : "<th>Vs</th>"}
                    <th>${category}</th>
                </thead>
                <tbody>
            `
        if(per === "game"){
            recordStat.forEach(record => {         
                const gamesRecord = GameResults.find(game => game.GameID === record.GameID)
                const getOpponenentsTeamID = gamesRecord.TeamOne === record.TeamID ? gamesRecord.TeamTwo : gamesRecord.TeamOne
                const getOpponenentsTeamObject = Teams.find(team => team.TeamID === getOpponenentsTeamID) 
                const getOpponentsTeamName = getOpponenentsTeamObject["TeamName"]
                recordHTML += `
                                <tr>
                                    <td>${playersMAP.get(record.PlayerID)}</td>
                                    ${"<td>"+ gamesRecord.SeasonNumber + "</td>"}
                                    <td>${getOpponentsTeamName}</td>
                                    <td>${record[category]}</td>
                                </tr>`
            })
        }
        if(per === "season"){
            recordStat.forEach(record => {    
            const [name, seasonNum, recordCount] = record    
            recordHTML += `
                            <tr>
                                <td>${name}</td>
                                <td>${seasonNum}</td>
                                <td>${recordCount}</td>
                            </tr>`
            })
        }
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

///////////////////
//helper functions
///////////////////
    let filteredStats

// function that returns the stat and based on either team or player type record
function getStat({type, mode, seasonNumber, category, per}){
    if(type === "player"){
        return getPlayerRecord({mode, seasonNumber, category, per})
    } else {
        return getTeamRecord({mode, seasonNumber, category, per})
    }
}

//////////////////////
// team type records
//////////////////////

function getTeamRecord({mode, seasonNumber, category, per}){

}

//////////////////////
// player type records
//////////////////////

function getPlayerRecord({mode, seasonNumber, category, per}){


    if(per === "game"){
        // stats that require some forumla from the base stats
        if(category === "Points"){
            const gamesList = getGameIdsBySeason(mode, +seasonNumber)
            const extractedGameIds = extractGameIds(gamesList)
            const getArrayOfPlayersGames = getPlayersGameObjects({category, per}, extractedGameIds)
            const tempAllTimePointsDetails = getArrayOfPlayersGames.map(game => {
                return [game.PlayerID, game.GameID, game.Goals + game.Assists]
            }).sort((a, b) => b[2] - a[2]).slice(0, 5)
    
             const tempArrayOfPlayerStats = []
    
             tempAllTimePointsDetails.forEach(gameDetails => {
                    GamePlayerStats.find(game => {
                    if(game.PlayerID === gameDetails[0] && game.GameID === gameDetails[1]){
                        game.Points = gameDetails[2]
                        tempArrayOfPlayerStats.push(game)
                    }
                })
             })
             return tempArrayOfPlayerStats
        }
        // stats that are a simple filter
        const gamesList = getGameIdsBySeason(mode, +seasonNumber)
        const extractedGameIds = extractGameIds(gamesList)
        filteredStats = getPlayersGameObjects({category, per}, extractedGameIds).slice(0,5)
    }

    if(per === "season"){
        // stats that are a simple filter
        filteredStats = extractSeasonMAPS({mode, category})
    }

    return filteredStats
}

function extractSeasonMAPS({mode, category}){
    // array to hold top MAP stats
    const playersArray = []
    // filter out MAPS by mode
    switch(mode){
        case "all":
            for(let player of playersMAP){
                for(let i=1; i<=seasonCount.length; i++){
                    const mapName = `playersSeason${i}CombinedStatsMAP`
                    const statMAP = IndividualPlayerStats["allPlayersStats"][player[1]][mapName]
                    if(statMAP){
                        playersArray.push([player[1], i, statMAP.get(category)])
                    }
                }
            }
        break;
        case "season":
            for(let player of playersMAP){
                for(let i=1; i<=seasonCount.length; i++){
                    const mapName = `playersSeason${i}SeasonStatsMAP`
                    const statMAP = IndividualPlayerStats["allPlayersStats"][player[1]][mapName]
                    if(statMAP){
                        playersArray.push([player[1], i, statMAP.get(category)])
                    }
                }
            }
        break;
        case "playoff":
            for(let player of playersMAP){
                for(let i=1; i<=seasonCount.length; i++){
                    const mapName = `playersSeason${i}PlayoffStatsMAP`
                    const statMAP = IndividualPlayerStats["allPlayersStats"][player[1]][mapName]
                    if(statMAP){
                        playersArray.push([player[1], i, statMAP.get(category)])
                    }
                }
            }
        break;
        default:
            for(let player of playersMAP){
                for(let i=1; i<=seasonCount.length; i++){
                    const mapName = `playersSeason${i}CombinedStatsMAP`
                    const statMAP = IndividualPlayerStats["allPlayersStats"][player[1]][mapName]
                    if(statMAP){
                        playersArray.push([player[1], i, statMAP.get(category)])
                    }
                }
            }           
    }   
    
    playersArray.sort((a, b) => b[2] - a[2])
    const recordsArray = playersArray.slice(0,5)
    return recordsArray
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
       recordStat = getRequestedGameStat({category}, getPlayersGameDataByGamesId, true)
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
        if(per === "game"){
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
        if(per === "season"){
            if(mode === "all" && seasonNumber === "all"){
                return `All time record for combined season and playoff ${category.toLowerCase()} in a ${per}`
            }
            if(mode === "season" && seasonNumber === "all"){
                return `All time season record for ${category.toLowerCase()} in a ${per}`
            }
            if(mode === "playoff" && seasonNumber === "all"){
                return `All time record for playoff ${category.toLowerCase()} in a ${per}`
            }
            if(mode === "all" && seasonNumber !== "all"){
                return `All time record for combined season and playoff ${category.toLowerCase()} in a ${per}`
            }
            if(mode === "season" && seasonNumber !== "all"){
                return `All time record for combined season and playoff ${category.toLowerCase()} in a ${per}`
            }
            if(mode === "playoff" && seasonNumber !== "all"){
                return `All time record for combined season and playoff ${category.toLowerCase()} in a ${per}`
            }
        }
    }

    return "If you see this a table caption scenario has been missed"
}

export default showSelectedRecords
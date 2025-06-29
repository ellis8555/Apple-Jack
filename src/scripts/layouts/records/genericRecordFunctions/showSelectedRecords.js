import getSelectValues from "./getSelectValues";
import clearScoreboardDiv from "../../../scoreboard/clearScoreboardDiv";
import getScoreboardDiv from "../../../scoreboard/getScoreboardDiv"
import { GameResults, GamePlayerStats, TeamPlayers } from "../../../../constants/masterHaxData";

function showSelectedRecords(){
    clearScoreboardDiv()
    const scoreboardDiv = getScoreboardDiv()
    const selectedValues = getSelectValues()

    const template = document.createElement('template')
    template.innerHTML = `
        <p>Records page under construction</p>
    `

    const clonedNode = template.content.cloneNode(true)
    scoreboardDiv.append(clonedNode)
}

export default showSelectedRecords
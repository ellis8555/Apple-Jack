import createElement from "../../../misc/createElement"
import teamsColorMAP from "../../../var_lib/maps/teams/teamsColorMAP"
import eachTeamObjectMAP from "../../../var_lib/maps/teams/eachTeamObjectMAP"
import { TEAM_LOGO_SIZE } from "../../../../constants/consts/vars"

function seriesBye(team, seasonNumber){
    // flex container for alignments
    const byeContainer = createElement("div", `byeContainer`)
    // flex container for alignments
    const byeInnerContainer = createElement("div", `semi1`)
    // flex containers that contain the series data
    const series = createElement("div", "series")
    // teams name
    const teamName = createElement("div", "teamData")
    teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
    teamName.style.display = "flex"
    teamName.style.justifyContent = "space-between"
    teamName.textContent = `(1) ` + team.get("Team")
    // add teams logo
    const seasonNumberAsNumber = parseInt(seasonNumber)
    const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
    const teamLogo = document.createElement('img')
    const teamsLogoName = eachTeamObjectMAP.get(team.get("Team"))[`${seasonNumberFolderName}HomeFilePath`]
    teamLogo.src = `../../../../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`
    teamLogo.alt = 'img'
    teamLogo.style.marginLeft = "1rem"
    teamLogo.style.height = TEAM_LOGO_SIZE
    teamLogo.style.width = TEAM_LOGO_SIZE
    teamName.append(teamLogo)
    // bye message
    const byeMessage = createElement("div", "teamData");
    byeMessage.textContent = "(Bye)"
    // team one flex container
    const seriesTeam1Results = {
        seriesWinner: team.get("Team")
    }

    // append each teams row of results
    byeInnerContainer.append(series)
    series.append(byeMessage)
    series.append(teamName)
    byeContainer.append(byeInnerContainer)

    return {
        byeContainer,
        seriesTeam1Results,
    }

}

export default seriesBye
import createElement from "../../../misc/createElement"
import teamsColorMAP from "../../../var_lib/maps/teams/teamsColorMAP"

function seriesBye(team){
    // flex container for alignments
    const byeContainer = createElement("div", `byeContainer`)
    // flex container for alignments
    const byeInnerContainer = createElement("div", `semi1`)
    // flex containers that contain the series data
    const series = createElement("div", "series")
    // teams name
    const teamName = createElement("div", "teamData")
    teamName.style.backgroundColor = "#" + teamsColorMAP.get(team.get("Team"))
    teamName.textContent = `(1) ` + team.get("Team")
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
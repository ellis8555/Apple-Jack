import TeamName from "./teamsPageHeader/TeamName"
import SeasonNumber from "./teamsPageHeader/SeasonNumber";
import TeamRecord from "./teamsPageHeader/TeamRecord"
import PlayersButton from "./playersButton/PlayersButton";
import SeasonResultButton from "./seasonResultsButton/SeasonResultsButton";
import PlayoffResultButton from "./playoffResultsButton/PlayoffResultsButton";
import TeamColorsButton from "./teamColorsButton/TeamColorsButton";

function TeamsPageLayout(teamName, seasonNumber, wins, losses, draws, color){
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-container", "w3-margin", "teamsLayout")

    containerElem.append(TeamName(teamName))
    containerElem.append(SeasonNumber(seasonNumber))
    containerElem.append(TeamRecord(wins, losses, draws))
    containerElem.append(PlayersButton(teamName, seasonNumber))
    containerElem.append(SeasonResultButton(teamName, seasonNumber))
    containerElem.append(PlayoffResultButton(teamName, seasonNumber))
    containerElem.append(TeamColorsButton(teamName, seasonNumber, color))


// console.log(containerElem)
    return containerElem;
}

export default TeamsPageLayout;
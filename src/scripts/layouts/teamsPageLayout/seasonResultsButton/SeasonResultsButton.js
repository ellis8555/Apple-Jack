function SeasonResultButton(teamName, seasonNumber){
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-round", "seasonScoreboard");
    containerElem.setAttribute("data-team-name", teamName)
    containerElem.setAttribute("data-season-num", seasonNumber)
    containerElem.setAttribute("data-game-type", "Season")

    containerElem.textContent = "Season Results";
    
    return containerElem;
}

export default SeasonResultButton;
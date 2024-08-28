function PlayoffResultButton(teamName, seasonNumber){
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-round", "playoffScoreboard");
    containerElem.setAttribute("data-team-name", teamName)
    containerElem.setAttribute("data-season-num", seasonNumber)
    containerElem.setAttribute("data-game-type", "Playoff")

    containerElem.textContent = "Playoff Results";
    
    return containerElem;
}

export default PlayoffResultButton;
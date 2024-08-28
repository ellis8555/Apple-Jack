function PlayersButton(teamName, seasonNumber){
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-round", "w3-green", "players");
    containerElem.setAttribute("data-team-name", teamName)
    containerElem.setAttribute("data-season-num", seasonNumber)
    containerElem.setAttribute("data-game-type", "Season")

    containerElem.textContent = "Players";
    
    return containerElem;
}

export default PlayersButton;
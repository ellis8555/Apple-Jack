function TeamColorsButton(teamName, seasonNumber, buttonColor){
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-round", "teamColors");
    containerElem.style.backgroundColor = `#${buttonColor}`;
    containerElem.setAttribute("data-team-name", teamName)
    containerElem.setAttribute("data-season-num", seasonNumber)
    containerElem.textContent = "Team Colors"

    return containerElem;
}

export default TeamColorsButton;
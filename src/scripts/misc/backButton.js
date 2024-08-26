import teamsColorMAP from "../var_lib/maps/teams/teamsColorMAP";

function backButton(id, teamName, seasonNum, gameType = "Season", ...styleClasses){
    const buttonDiv = document.createElement("div");
    buttonDiv.id = id;
    buttonDiv.classList.add('w3-btn', 'w3-round-large')
    buttonDiv.style.backgroundColor = `#${teamsColorMAP.get(teamName)}`
    buttonDiv.style.color = "#ffffff"
    buttonDiv.setAttribute("data-team-name", teamName);
    buttonDiv.setAttribute("data-season-num", seasonNum);
    buttonDiv.setAttribute("data-game-type", gameType);
    if(styleClasses.length > 0){
        styleClasses.forEach(className => {
            buttonDiv.classList.add(className)
        })
    }
    buttonDiv.textContent = "back"
    return buttonDiv
}

export default backButton;

function playersList(playersArray, teamColor){
    const playersListContainer = document.createElement('div');
    // the following div ID "teamPlayerList" is used for where to position the regular season players table after a sort function
    playersListContainer.id = "teamPlayerList";
    playersListContainer.classList.add("w3-padding", "w3-padding", "w3-card", "w3-round-large")
    playersListContainer.style.color = "#fff";
    playersListContainer.style.backgroundColor = teamColor;
    playersArray.forEach(item => {
    const div = document.createElement('div');
    div.style.fontSize = "1.2rem";
    div.textContent = item;
    playersListContainer.append(div)
    })
    return playersListContainer
}

export default playersList;
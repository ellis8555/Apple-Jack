import playersMAP from "../../../../var_lib/maps/players/playersMAP";

function boxscorePlayersTableDataElements(thisGamesPlayerStatMAPS, tableHeaders, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor, sortBy){
    const fragment = document.createDocumentFragment()
    const fieldsLength = tableHeaders.length;
    // this runs for each player in the game
    thisGamesPlayerStatMAPS.forEach((item) => {
        const playersRowOfData = document.createElement('tr');

    // loop only over the fields defined by tableHeaders var passed in
        for(let i = 0; i < fieldsLength; i++){
            const td = document.createElement('td');
            td.setAttribute("data-field-name", tableHeaders[i]);

            // add yellow background to cells that fall under the current field that is sorted
            if(tableHeaders[i] == sortBy){
                td.classList.add("w3-yellow");
                td.textContent = item.get(tableHeaders[i])
                // for dealing with the players name within the table
            } else if(tableHeaders[i] == "Name"){
                const playerName = playersMAP.get(+item.get("PlayerID"));
                const isHomeTeamPlayer = thisGamesHomeTeamPlayerNames.includes(playerName);
                td.style.backgroundColor = isHomeTeamPlayer ? `${thisGamesHomeTeamColor}` : `${thisGamesAwayTeamColor}`;
                td.style.color = "#fff";
                td.textContent = playerName;
            } else {
                td.textContent = item.get(tableHeaders[i])
            }
            // add the single cell of data for the current field which is tableHeaders[i]
            playersRowOfData.append(td)
        }
        // add the single cell to the players row in the html table then loop again over the next players stat
        fragment.append(playersRowOfData)
    })
    return fragment;
}

export default boxscorePlayersTableDataElements;
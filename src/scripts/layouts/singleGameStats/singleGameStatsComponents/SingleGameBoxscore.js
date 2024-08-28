function SingleGameBoxscore({
    thisGamesHomeTeamColor,
    thisGamesAwayTeamColor,
    thisGamesHomeTeamStats,
    thisGamesAwayTeamStats
}){
    const gameCategories = [
        "Team",
        "Score",
        "Possession",
        "SOG",
        "Passes",
        "Kicks",
      ];

      // create container to hold boxscore stats
      const fragment = document.createDocumentFragment()

    for (let i = 0; i < gameCategories.length; i++) {
        const boxscoreRowContainerElem = document.createElement('div');
        boxscoreRowContainerElem.classList.add("boxscoreContainer", "w3-center")

        // create first column of three
        const boxscoreHomeCell = document.createElement('div');
        boxscoreHomeCell.classList.add("boxscoreHomeStats")
      // set first rows home teams cell to teams main color
      boxscoreHomeCell.textContent = thisGamesHomeTeamStats[i];

      // create the 2nd column of stat categories
      const seperatorDiv = document.createElement('div');
      seperatorDiv.classList.add("boxscoreSeperator")
      seperatorDiv.textContent = gameCategories[i];

      const boxscoreAwayCell = document.createElement('div');
      boxscoreAwayCell.classList.add("boxscoreAwayStats")
      boxscoreAwayCell.textContent = thisGamesAwayTeamStats[i]

      // add teams background color to name field of team only
      if (i == 0) {
        boxscoreHomeCell.style.backgroundColor = `${thisGamesHomeTeamColor}`
        boxscoreAwayCell.style.backgroundColor = `${thisGamesAwayTeamColor}`
      } 

      boxscoreRowContainerElem.append(boxscoreHomeCell)
      boxscoreRowContainerElem.append(seperatorDiv)
      boxscoreRowContainerElem.append(boxscoreAwayCell)
      fragment.append(boxscoreRowContainerElem);
    }

    //create some space between players table
    const breakDiv = document.createElement("br")
    fragment.append(breakDiv)
    fragment.append(breakDiv)

    // create div for players stat for this game
    const playersDiv = document.createElement('div')
    playersDiv.id = "boxscorePlayerStats";

    fragment.append(playersDiv)

    return fragment
}

export default SingleGameBoxscore;
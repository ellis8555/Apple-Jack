function setAllTimeHomeGames(seasonNumber, writeToMAP, teamsMAP, TeamStats, i, inputArray, allTimeOrIndividual = "allTime"){
    const length = allTimeOrIndividual === "season"
    ?         TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
        (item) => item.TeamOne == i
      )
    :         TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
        (item) => item.TeamOne == i
      )

    const map = allTimeOrIndividual === "season" ? `season${seasonNumber}HomeGames` : `allTimeHomeGames`;

    this[writeToMAP].set(
        map,
        length
      );
}

export default setAllTimeHomeGames;
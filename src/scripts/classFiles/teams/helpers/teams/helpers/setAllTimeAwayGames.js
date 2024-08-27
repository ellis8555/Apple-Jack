function setAllTimeAwayGames(seasonNumber, writeToMAP, teamsMAP, TeamStats, i, inputArray, allTimeOrIndividual = "allTime"){
    const length = allTimeOrIndividual === "season"
    ?         TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
        (item) => item.TeamTwo == i
      )
    :         TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
        (item) => item.TeamTwo == i
      )

    const map = allTimeOrIndividual === "season" ? `season${seasonNumber}AwayGames` : `allTimeAwayGames`;

    this[writeToMAP].set(
        map,
        length
      );
}

export default setAllTimeAwayGames;
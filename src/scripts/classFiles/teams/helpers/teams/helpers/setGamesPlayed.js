function setGamesPlayed(seasonNumber = undefined, writeToMAP, teamsMAP, TeamStats, i, inputArray, allTimeOrIndividual = "allTime"){
    const length = allTimeOrIndividual === "season"
    ? TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].length
    : TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].length;

  this[writeToMAP].set("GP", length);
}

export default setGamesPlayed;
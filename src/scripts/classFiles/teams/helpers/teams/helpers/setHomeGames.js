function setHomeGames(i, {seasonNumber, writeToMAP, teamsMAP, TeamStats, inputArray}){
  let value;
  if(seasonNumber){
    value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
      (item) => item.TeamOne == i
    )
  } else {
    value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
      (item) => item.TeamOne == i
    )
  }

    const key = seasonNumber ? `season${seasonNumber}HomeGames` : `allTimeHomeGames`;
    this[writeToMAP].set(
        key,
        value
      );
}

export default setHomeGames;
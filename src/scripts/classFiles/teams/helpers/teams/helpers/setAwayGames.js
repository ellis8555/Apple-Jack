function setAwayGames(i, {seasonNumber, writeToMAP, teamsMAP, TeamStats, inputArray}){
  let value;
  if(seasonNumber){
    value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
      (item) => item.TeamTwo == i
    )
  } else {
    value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
      (item) => item.TeamTwo == i
    )
  }

    const key = seasonNumber ? `season${seasonNumber}AwayGames` : `allTimeAwayGames`;

    this[writeToMAP].set(
        key,
        value
      );
}

export default setAwayGames;
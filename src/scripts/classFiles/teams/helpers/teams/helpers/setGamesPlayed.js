function setGamesPlayed(i, {writeToMAP, teamsMAP, TeamStats, inputArray, seasonNumber}){
    let value;
    if(seasonNumber){
      value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].length
    } else {
      value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].length;
    }

  this[writeToMAP].set("GP", value);
}

export default setGamesPlayed;
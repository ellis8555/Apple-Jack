function setDraws(i, {seasonNumber, writeToMAP, TeamStats, teamsMAP, inputArray}){
    let value;
    if(seasonNumber){
      value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
        (item) => Number(item.TeamOneScore) == Number(item.TeamTwoScore)
      )
    } else {
      value = TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
        (item) => Number(item.TeamOneScore) == Number(item.TeamTwoScore)
      )
    }
    this[writeToMAP].set(
        "drawGames",
        value
      );
      // all time Draws Length
      this[writeToMAP].set("Draws", this[writeToMAP].get("drawGames").length);
}

export default setDraws;
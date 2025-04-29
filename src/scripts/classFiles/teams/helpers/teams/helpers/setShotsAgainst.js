function setShotsAgainst({
    writeToMAP,
    seasonNumber}){
    // set for each season
    if(seasonNumber){
      //check if any away games were even played
        if (
            this[writeToMAP].get(`GP`) > 0
          ) {
            const homeShotsAgainst = this[writeToMAP]
              .get(`season${seasonNumber}HomeGames`)
              .map(item => item.TeamTwoShotsOnGoal)
              .reduce((shotStart, addShot) => +shotStart + +addShot, 0)
            const awayShotsAgainst = this[writeToMAP]
              .get(`season${seasonNumber}AwayGames`)
              .map(item => item.TeamOneShotsOnGoal)
              .reduce((shotStart, addShot) => +shotStart + +addShot, 0)
            this[writeToMAP].set(
              `SA`,
              homeShotsAgainst + awayShotsAgainst
            );
          } else {
            this[writeToMAP].set(`SA`, 0);
          }
    }
}

export default setShotsAgainst;
function setShotsFor({
    writeToMAP,
    seasonNumber}){
    // set for each season
    if(seasonNumber){
      //check if any away games were even played
        if (
            this[writeToMAP].get(`GP`) > 0
          ) {
            const homeShots = this[writeToMAP]
              .get(`season${seasonNumber}HomeGames`)
              .map(item => item.TeamOneShotsOnGoal)
              .reduce((shotStart, addShot) => +shotStart + +addShot, 0)
            const awayShots = this[writeToMAP]
              .get(`season${seasonNumber}AwayGames`)
              .map(item => item.TeamTwoShotsOnGoal)
              .reduce((shotStart, addShot) => +shotStart + +addShot, 0)
            this[writeToMAP].set(
              `SOG`,
              homeShots + awayShots
            );
          } else {
            this[writeToMAP].set(`SOG`, 0);
          }
    }
}

export default setShotsFor;
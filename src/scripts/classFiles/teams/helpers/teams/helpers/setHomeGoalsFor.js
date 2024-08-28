function setHomeGoalsFor({seasonNumber, writeToMAP}){
    // set for each season
    if(seasonNumber){
      if (
        //check if any home games were even played
        this[writeToMAP].get(`season${seasonNumber}HomeGames`).length != 0
      ) {
        this[writeToMAP].set(
          `season${seasonNumber}HomeGoalsFor`,
          this[writeToMAP]
            .get(`season${seasonNumber}HomeGames`)
            .map((item) => item.TeamOneScore)
            .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
        );
      } else {
        this[writeToMAP].set(`season${seasonNumber}HomeGoalsFor`, 0);
      }
      // exit the method to avoid all time stats
        return;
    }
    // set all time stats
    //check if any home games were even played
    if (this[writeToMAP].get("allTimeHomeGames").length != 0) {
        this[writeToMAP].set(
          "allTimeHomeGoalsFor",
          this[writeToMAP]
            .get("allTimeHomeGames")
            .map((item) => item.TeamOneScore)
            .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
        );
      } else {
        this[writeToMAP].set("allTimeHomeGoalsFor", 0);
      }
}

export default setHomeGoalsFor;
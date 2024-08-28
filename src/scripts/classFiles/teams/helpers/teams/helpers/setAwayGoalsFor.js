function setAwayGoalsFor({seasonNumber, writeToMAP}){
    // set for each season
    if(seasonNumber){
        if (
            this[writeToMAP].get(`season${seasonNumber}AwayGames`).length != 0
          ) {
            //check if any away games were even played
            this[writeToMAP].set(
              `season${seasonNumber}AwayGoalsFor`,
              this[writeToMAP]
                .get(`season${seasonNumber}AwayGames`)
                .map((item) => item.TeamTwoScore)
                .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}AwayGoalsFor`, 0);
          }
        // exit the method to avoid all time stats
        return;
    }
    // set all time stats
    //check if any home games were even played
    if (this[writeToMAP].get("allTimeAwayGames").length != 0) {
        //check if any away games were even played
        this[writeToMAP].set(
          "allTimeAwayGoalsFor",
          this[writeToMAP]
            .get("allTimeAwayGames")
            .map((item) => item.TeamTwoScore)
            .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
        );
      } else {
        this[writeToMAP].set("allTimeAwayGoalsFor", 0);
      }
}

export default setAwayGoalsFor;
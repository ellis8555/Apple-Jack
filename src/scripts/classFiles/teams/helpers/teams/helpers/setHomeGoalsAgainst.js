function setHomeGoalsAgainst({seasonNumber, writeToMAP}){
    if(seasonNumber){
        if (
            this[writeToMAP].get(`season${seasonNumber}HomeGames`).length != 0
          ) {
            // check if any home games were even played
            this[writeToMAP].set(
              `season${seasonNumber}HomeGoalsAgainst`,
              this[writeToMAP]
                .get(`season${seasonNumber}HomeGames`)
                .map((item) => item.TeamTwoScore) // TeamTwo is opponent
                .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}HomeGoalsAgainst`, 0);
          }
        return;
    }

    if (this[writeToMAP].get("allTimeHomeGames").length != 0) {
        // check if any home games were even played
        this[writeToMAP].set(
          "allTimeHomeGoalsAgainst",
          this[writeToMAP]
            .get("allTimeHomeGames")
            .map((item) => item.TeamTwoScore) // TeamTwo is opponent
            .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
        );
      } else {
        this[writeToMAP].set("allTimeHomeGoalsAgainst", 0);
      }
}

export default setHomeGoalsAgainst;
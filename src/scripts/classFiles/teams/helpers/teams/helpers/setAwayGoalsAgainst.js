function setAwayGoalsAgainst({seasonNumber, writeToMAP}){
    if(seasonNumber){
        if (
            this[writeToMAP].get(`season${seasonNumber}AwayGames`).length != 0
          ) {
            this[writeToMAP].set(
              `season${seasonNumber}AwayGoalsAgainst`,
              this[writeToMAP]
                .get(`season${seasonNumber}AwayGames`)
                .map((item) => item.TeamOneScore) // TeamOne is opponent
                .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}AwayGoalsAgainst`, 0);
          }
        return;
    }

    if (this[writeToMAP].get("allTimeAwayGames").length != 0) {
        this[writeToMAP].set(
          "allTimeAwayGoalsAgainst",
          this[writeToMAP]
            .get("allTimeAwayGames")
            .map((item) => item.TeamOneScore) // TeamOne is opponent
            .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
        );
      } else {
        this[writeToMAP].set("allTimeAwayGoalsAgainst", 0);
      }
}

export default setAwayGoalsAgainst;
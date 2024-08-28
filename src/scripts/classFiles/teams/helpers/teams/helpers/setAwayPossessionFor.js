function setAwayPossessionFor({seasonNumber, writeToMAP}){
    if(seasonNumber){
        if (this[writeToMAP].get(`season${seasonNumber}AwayGames`) != 0) {
            this[writeToMAP].set(
              `season${seasonNumber}awayPossessionFor`,
              this[writeToMAP]
                .get(`season${seasonNumber}AwayGames`)
                .map((item) => item.TeamTwoPossession)
                .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}awayPossessionFor`, 0);
          }
        return;
    }

    if (this[writeToMAP].get("allTimeAwayGames") != 0) {
        this[writeToMAP].set(
          "awayPossessionFor",
          this[writeToMAP]
            .get("allTimeAwayGames")
            .map((item) => item.TeamTwoPossession)
            .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
        );
      } else {
        this[writeToMAP].set("awayPossessionFor", 0);
      }
}

export default setAwayPossessionFor;
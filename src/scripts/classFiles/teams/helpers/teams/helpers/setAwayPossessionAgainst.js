function setAwayPossessionAgainst({seasonNumber, writeToMAP}){
    if(seasonNumber){
        if (this[writeToMAP].get(`season${seasonNumber}AwayGames`) != 0) {
            this[writeToMAP].set(
              `season${seasonNumber}awayPossessionAgainst`,
              this[writeToMAP]
                .get(`season${seasonNumber}AwayGames`)
                .map((item) => item.TeamOnePossession) // TeamOne is opponent
                .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}awayPossessionAgainst`, 0);
          }
        return;
    }

    if (this[writeToMAP].get("allTimeAwayGames") != 0) {
        this[writeToMAP].set(
          "awayPossessionAgainst",
          this[writeToMAP]
            .get("allTimeAwayGames")
            .map((item) => item.TeamOnePossession) // TeamOne is opponent
            .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
        );
      } else {
        this[writeToMAP].set("awayPossessionAgainst", 0);
      }
}

export default setAwayPossessionAgainst;
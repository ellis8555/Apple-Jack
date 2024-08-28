function setHomePossessionAgainst({seasonNumber, writeToMAP}){
    if(seasonNumber){
        if (this[writeToMAP].get(`season${seasonNumber}HomeGames`) != 0) {
            this[writeToMAP].set(
              `season${seasonNumber}homePossessionAgainst`,
              this[writeToMAP]
                .get(`season${seasonNumber}HomeGames`)
                .map((item) => item.TeamTwoPossession) // TeamTwo is opponent
                .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}homePossessionAgainst`, 0);
          }
        return;
    }

    if (this[writeToMAP].get("allTimeHomeGames") != 0) {
        this[writeToMAP].set(
          "homePossessionAgainst",
          this[writeToMAP]
            .get("allTimeHomeGames")
            .map((item) => item.TeamTwoPossession) // TeamTwo is opponent
            .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
        );
      } else {
        this[writeToMAP].set("homePossessionAgainst", 0);
      }
}

export default setHomePossessionAgainst;
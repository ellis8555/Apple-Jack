function setHomePossessionFor({seasonNumber, writeToMAP}){
    if(seasonNumber){
        if (this[writeToMAP].get(`season${seasonNumber}HomeGames`) != 0) {
            this[writeToMAP].set(
              `season${seasonNumber}homePossessionFor`,
              this[writeToMAP]
                .get(`season${seasonNumber}HomeGames`)
                .map((item) => item.TeamOnePossession)
                .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
            );
          } else {
            this[writeToMAP].set(`season${seasonNumber}homePossessionFor`, 0);
          }
        return;
    }

    if (this[writeToMAP].get("allTimeHomeGames") != 0) {
        this[writeToMAP].set(
          "homePossessionFor",
          this[writeToMAP]
            .get("allTimeHomeGames")
            .map((item) => item.TeamOnePossession)
            .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
        );
      } else {
        this[writeToMAP].set("homePossessionFor", 0);
      }
}

export default setHomePossessionFor;
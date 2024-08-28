function setGoalsFor({seasonNumber, writeToMAP}){
    // check for data per season
    if(seasonNumber){
        this[writeToMAP].set(
            "GF",
            +this[writeToMAP].get(`season${seasonNumber}HomeGoalsFor`) +
              +this[writeToMAP].get(`season${seasonNumber}AwayGoalsFor`)
          );
        return;
    }

    // this for all time goals for
    this[writeToMAP].set(
        "GF",
        +this[writeToMAP].get("allTimeHomeGoalsFor") +
          +this[writeToMAP].get("allTimeAwayGoalsFor")
      );
}

export default setGoalsFor;
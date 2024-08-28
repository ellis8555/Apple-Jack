function setGoalsAgainst({seasonNumber, writeToMAP}){
    if(seasonNumber){
        this[writeToMAP].set(
            "GA",
            +this[writeToMAP].get(`season${seasonNumber}HomeGoalsAgainst`) +
              +this[writeToMAP].get(`season${seasonNumber}AwayGoalsAgainst`)
          );
        return;
    }

    this[writeToMAP].set(
        "GA",
        +this[writeToMAP].get("allTimeHomeGoalsAgainst") +
          +this[writeToMAP].get("allTimeAwayGoalsAgainst")
      );
}

export default setGoalsAgainst;
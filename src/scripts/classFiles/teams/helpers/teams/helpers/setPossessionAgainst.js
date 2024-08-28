function setPossessionAgainst({seasonNumber, writeToMAP}){
    if(seasonNumber){
        this[writeToMAP].set(
            "PA",
            +this[writeToMAP].get(`season${seasonNumber}homePossessionAgainst`) +
              +this[writeToMAP].get(`season${seasonNumber}awayPossessionAgainst`)
          );
        return;
    }

    this[writeToMAP].set(
        "PA",
        +this[writeToMAP].get("homePossessionAgainst") +
          +this[writeToMAP].get("awayPossessionAgainst")
      );
}

export default setPossessionAgainst;
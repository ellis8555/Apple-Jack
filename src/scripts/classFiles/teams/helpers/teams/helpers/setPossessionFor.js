function setPossessionFor({seasonNumber, writeToMAP}){
    if(seasonNumber){
        this[writeToMAP].set(
            "PF",
            +this[writeToMAP].get(`season${seasonNumber}homePossessionFor`) +
              +this[writeToMAP].get(`season${seasonNumber}awayPossessionFor`)
          );
        return;
    }

    this[writeToMAP].set(
        "PF",
        +this[writeToMAP].get("homePossessionFor") +
          +this[writeToMAP].get("awayPossessionFor")
      );
}

export default setPossessionFor;
function setPoints({seasonNumber, writeToMAP}, doesSeasonHaveTieGames = false){
    // first if check looks for season stats as opposed to all time stats
    if(seasonNumber){
        if(doesSeasonHaveTieGames){
            // with tie games
            this[writeToMAP].set(
                "Points",
                this[writeToMAP].get("Wins") * 3 + this[writeToMAP].get("Draws")
              );
        } else {
            // without tie games
            this[writeToMAP].set(
                "Points",
                (this[writeToMAP].get("Wins") - this[writeToMAP].get("OTW")) * 3 +
                  this[writeToMAP].get("OTW") * 2 +
                  this[writeToMAP].get("OTL")
              );
        }
    } else {
        this[writeToMAP].set(
            "Points",
            this[writeToMAP].get("Wins") * 3 + this[writeToMAP].get("Draws")
          );
    }
}

export default setPoints;
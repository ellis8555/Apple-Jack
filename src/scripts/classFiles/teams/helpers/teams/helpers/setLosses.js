function setLosses({seasonNumber, writeToMAP}, doesSeasonHaveTieGames = false, ){
  // first if check looks for season stats as opposed to all time stats
  if(seasonNumber){
    if(doesSeasonHaveTieGames){
                // season WITH ties
                this[writeToMAP].set(
                  "Losses",
                  this[writeToMAP].get("GP") -
                    (this[writeToMAP].get("Wins") + this[writeToMAP].get("Draws"))
                );
    } else {
                // season with NO ties
                this[writeToMAP].set(
                  "Losses",
                  this[writeToMAP].get("GP") -
                    (this[writeToMAP].get("Wins") + this[writeToMAP].get("OTL"))
                );
    }
  } else {
    // set all time losses for all time stats
          this[writeToMAP].set(
              "Losses",
              this[writeToMAP].get("GP") -
                (this[writeToMAP].get("Wins") + this[writeToMAP].get("Draws"))
            );
  }
}

export default setLosses;
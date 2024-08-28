function setWins({seasonNumber, writeToMAP}){
    let homeWins;
    let awayWins
    if(seasonNumber){
        homeWins = `season${seasonNumber}HomeWins`;
        awayWins = `season${seasonNumber}AwayWins`;
    } else {
        homeWins = "allTimeHomeWins";
        awayWins = "allTimeAwayWins";
    }
    this[writeToMAP].set(
        "Wins",
        this[writeToMAP].get(homeWins).length +
          this[writeToMAP].get(awayWins).length
      );
}

export default setWins;
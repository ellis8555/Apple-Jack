function setSavePercentage({
    writeToMAP,
    seasonNumber}){
    // set for each season
    if(seasonNumber){
      //check if any away games were even played
        if (
            this[writeToMAP].get(`season${seasonNumber}AwayGames`).length != 0
          ) {
            const shotsAgainst = this[writeToMAP]
              .get(`SA`)
            const goalsAgainst = this[writeToMAP]
              .get(`GA`)
            const savePercentage = (1 - (goalsAgainst/shotsAgainst)).toFixed(3).slice(1)
            this[writeToMAP].set(
              `SV%`,
              savePercentage
            );
          } else {
            this[writeToMAP].set(`SV%`, .000);
          }
    }
    console.log(this[writeToMAP])
}

export default setSavePercentage;
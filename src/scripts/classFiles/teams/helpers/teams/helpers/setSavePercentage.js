function setSavePercentage({
    writeToMAP,
    seasonNumber}){
    // set for each season
    if(seasonNumber){
      //check if any away games were even played
        if (
            this[writeToMAP].get(`GP`) > 0
          ) {
            const shotsAgainst = this[writeToMAP]
              .get(`SA`)
            const goalsAgainst = this[writeToMAP]
              .get(`GA`)
            let savePercentage = (1 - (goalsAgainst/shotsAgainst)).toFixed(3)
            // check for 1/0 scenarios and adjust
            if(!isFinite(savePercentage)){
              savePercentage = "-"
            }
            // adjust formatting as long as proper number is returned. example .999
            if(savePercentage !== "-" && savePercentage !== 1){
              savePercentage = savePercentage.slice(1)
            }
            // adjust formatting for 1.000 results
            if(savePercentage === 1){
              savePercentage = "1.000"
            }
            // set the result
            this[writeToMAP].set(
              `SV%`,
              savePercentage
            );
          } else {
            this[writeToMAP].set(`SV%`, "1.000");
          }
    }
}

export default setSavePercentage;
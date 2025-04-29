function setShotsAgainstAverage({writeToMAP}){
    if (
        //check for teams that did not make the playoffs to avoid "NaN" result
        this[writeToMAP].get("GP") > 0 &&
        this[writeToMAP].get("SA") > 0
      ) {
        this[writeToMAP].set(
            "SAA",
            (+this[writeToMAP].get("SA") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
      } else {
        this[writeToMAP].set("SAA", 0)
      }
}

export default setShotsAgainstAverage
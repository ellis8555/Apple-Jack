function setShotsForAverage({writeToMAP}){
    if (
        //check for teams that did not make the playoffs to avoid "NaN" result
        this[writeToMAP].get("GP") > 0 &&
        this[writeToMAP].get("SOG") > 0
      ) {
        this[writeToMAP].set(
            "SFA",
            (+this[writeToMAP].get("SOG") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
      } else {
        this[writeToMAP].set("SFA", 0)
      }
}

export default setShotsForAverage
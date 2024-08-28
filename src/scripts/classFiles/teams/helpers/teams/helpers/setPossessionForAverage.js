function setPossessionForAverage({writeToMAP}){
    if (
        //check for teams that did not make the playoffs to avoid "NaN" result
        this[writeToMAP].get("PF") != 0 &&
        this[writeToMAP].get("PA") != 0
      ) {
        this[writeToMAP].set(
          "PFA",
          (+this[writeToMAP].get("PF") / +this[writeToMAP].get("GP")).toFixed(
            2
          )
        );
      } else {
        this[writeToMAP].set("PFA", 0);
      }
}

export default setPossessionForAverage;
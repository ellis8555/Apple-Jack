function setGoalsForAverage({writeToMAP}){
  if (
    //check for teams that did not make the playoffs to avoid "NaN" result
    this[writeToMAP].get("GF") != 0 &&
    this[writeToMAP].get("GA") != 0
  ){
    this[writeToMAP].set(
      "GFA",
      (+this[writeToMAP].get("GF") / +this[writeToMAP].get("GP")).toFixed(
        2
      )
    );
  } else {
    this[writeToMAP].set("GFA", 0) && this[writeToMAP].set("GAA", 0);
  }
}

export default setGoalsForAverage;
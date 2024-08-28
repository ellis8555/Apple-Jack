function setGoalDifferential({writeToMAP}){

    this[writeToMAP].set(
        "GD",
        +this[writeToMAP].get("GF") - +this[writeToMAP].get("GA")
      );
}

export default setGoalDifferential;
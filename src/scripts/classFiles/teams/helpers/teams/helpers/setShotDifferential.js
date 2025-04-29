function setShotDifferential({writeToMAP}){

    this[writeToMAP].set(
        "SD",
        +this[writeToMAP].get("SOG") - +this[writeToMAP].get("SA")
      );
}

export default setShotDifferential;
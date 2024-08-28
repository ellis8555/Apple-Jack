function setOvertimeLosses({seasonNumber, writeToMAP}){
    this[writeToMAP].set(
        "OTL",
        this[writeToMAP]
          .get(`season${seasonNumber}HomeLosses`)
          .filter((item) => item.ExtraTime == "Yes").length +
          this[writeToMAP]
            .get(`season${seasonNumber}AwayLosses`)
            .filter((item) => item.ExtraTime == "Yes").length
      );
}

export default setOvertimeLosses;
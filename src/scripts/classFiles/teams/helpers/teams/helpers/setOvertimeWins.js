function setOvertimeWins({seasonNumber, writeToMAP}){
    this[writeToMAP].set(
        "OTW",
        this[writeToMAP]
          .get(`season${seasonNumber}HomeWins`)
          .filter((item) => item.ExtraTime == "Yes").length +
          this[writeToMAP]
            .get(`season${seasonNumber}AwayWins`)
            .filter((item) => item.ExtraTime == "Yes").length
      );
}

export default setOvertimeWins;
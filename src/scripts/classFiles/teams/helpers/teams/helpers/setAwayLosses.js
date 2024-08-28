function setAwayLosses({seasonNumber, writeToMAP}){
    this[writeToMAP].set(
        `season${seasonNumber}AwayLosses`,
        this[writeToMAP]
          .get(`season${seasonNumber}AwayGames`)
          .filter(
            (item) => Number(item.TeamOneScore) > Number(item.TeamTwoScore)
          )
      );
}

export default setAwayLosses;
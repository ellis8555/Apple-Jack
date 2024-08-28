function setHomeLosses({seasonNumber, writeToMAP}){
    this[writeToMAP].set(
        `season${seasonNumber}HomeLosses`,
        this[writeToMAP]
          .get(`season${seasonNumber}HomeGames`)
          .filter(
            (item) => Number(item.TeamOneScore) < Number(item.TeamTwoScore)
          )
      );
    }

export default setHomeLosses;
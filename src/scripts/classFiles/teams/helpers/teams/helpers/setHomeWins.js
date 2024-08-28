function setHomeWins({seasonNumber, writeToMAP}){
const key = seasonNumber ? `season${seasonNumber}HomeWins` : `allTimeHomeWins`;
const getMapName= seasonNumber ? `season${seasonNumber}HomeGames` : `allTimeHomeGames`;

    this[writeToMAP].set(
        key,
        this[writeToMAP]
        .get(getMapName)
        .filter(
          (item) => Number(item.TeamOneScore) > Number(item.TeamTwoScore)
        )
      );
}

export default setHomeWins;
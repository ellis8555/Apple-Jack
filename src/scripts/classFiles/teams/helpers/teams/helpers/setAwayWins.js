function setAwayWins({seasonNumber, writeToMAP}){
    const key = seasonNumber ? `season${seasonNumber}AwayWins` : `allTimeAwayWins`;
    const getMapName= seasonNumber ? `season${seasonNumber}AwayGames` : `allTimeAwayGames`;
    
        this[writeToMAP].set(
            key,
            this[writeToMAP]
            .get(getMapName)
            .filter(
              (item) => Number(item.TeamOneScore) < Number(item.TeamTwoScore)
            )
          );
    }

export default setAwayWins;
function bestOfSeriesGameResult(isTeamOneInGameResult, gamesArray, gameNum, resultBgColor, wins){
    if(isTeamOneInGameResult){
        if (gamesArray[gameNum].TeamOneScore > gamesArray[gameNum].TeamTwoScore) {
            resultBgColor = "limegreen";
            wins++;
        } else {
            resultBgColor = "red";
        }
    } else {
        if (gamesArray[gameNum].TeamTwoScore > gamesArray[gameNum].TeamOneScore) {
            resultBgColor = "limegreen";
            wins++
        } else {
            resultBgColor = "red";
        }
    }
    return { resultBgColor, wins }
}

export default bestOfSeriesGameResult
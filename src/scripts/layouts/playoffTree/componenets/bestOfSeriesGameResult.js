function bestOfSeriesGameResult(isTeamOneInGameResult, gamesArray, gameNum, resultBgColor, wins){
    if(isTeamOneInGameResult){
        if (gamesArray[gameNum].TeamOneScore > gamesArray[gameNum].TeamTwoScore) {
            resultBgColor = "green";
            wins++;
        } else {
            resultBgColor = "red";
        }
    } else {
        if (gamesArray[gameNum].TeamTwoScore > gamesArray[gameNum].TeamOneScore) {
            resultBgColor = "green";
            wins++
        } else {
            resultBgColor = "red";
        }
    }
    return { resultBgColor, wins }
}

export default bestOfSeriesGameResult
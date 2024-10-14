function bestOfSeriesGameResult(isTeamOneInGameResult, gamesArray, gameNum, resultBgColor, wins){
    if(isTeamOneInGameResult){
        if (gamesArray[gameNum].TeamOneScore > gamesArray[gameNum].TeamTwoScore) {
            if(gamesArray[gameNum].ExtraTime === "Yes"){
                resultBgColor = "#2196F3"
            } else {
                resultBgColor = "limegreen";
            }
            wins++;
        } else {
            if(gamesArray[gameNum].ExtraTime === "Yes"){
                resultBgColor = "#9E9E9E"
            } else {
                resultBgColor = "red";
            }
        }
    } else {
        if (gamesArray[gameNum].TeamTwoScore > gamesArray[gameNum].TeamOneScore) {
            if(gamesArray[gameNum].ExtraTime === "Yes"){
                resultBgColor = "#2196F3"
            } else {
                resultBgColor = "limegreen";
            }
            wins++
        } else {
            if(gamesArray[gameNum].ExtraTime === "Yes"){
                resultBgColor = "#9E9E9E"
            } else {
                resultBgColor = "red";
            }
        }
    }
    return { resultBgColor, wins }
}

export default bestOfSeriesGameResult
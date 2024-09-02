import teamsMAP from "../../../var_lib/maps/teams/teamsMAP";

function getGameResultClass(game, team) {
    if (team == `${teamsMAP.get(+game.TeamOne)}`) {
        if (game.TeamOneScore > game.TeamTwoScore && game.ExtraTime == "No") {
            return 'w3-green'; // Win
        } else if (game.TeamOneScore > game.TeamTwoScore && game.ExtraTime == "Yes") {
            return 'w3-blue'; // Overtime Win
        } else if (game.TeamOneScore == game.TeamTwoScore) {
            return 'w3-grey'; // Draw
        } else if (game.TeamOneScore < game.TeamTwoScore && game.ExtraTime == "Yes") {
            return 'w3-grey'; // Overtime Loss
        } else {
            return 'w3-red'; // Loss
        }
    } else if (team == `${teamsMAP.get(+game.TeamTwo)}`) {
        if (game.TeamTwoScore > game.TeamOneScore && game.ExtraTime == "No") {
            return 'w3-green'; // Win
        } else if (game.TeamTwoScore > game.TeamOneScore && game.ExtraTime == "Yes") {
            return 'w3-blue'; // Overtime Win
        } else if (game.TeamTwoScore == game.TeamOneScore) {
            return 'w3-grey'; // Draw
        } else if (game.TeamTwoScore < game.TeamOneScore && game.ExtraTime == "Yes") {
            return 'w3-grey'; // Overtime Loss
        } else {
            return 'w3-red'; // Loss
        }
    }
}

export default getGameResultClass;
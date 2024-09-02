import teamsMAP from "../../../var_lib/maps/teams/teamsMAP";

function getGameResultText(game, team) {
    if (team == `${teamsMAP.get(+game.TeamOne)}`) {
        if (game.TeamOneScore > game.TeamTwoScore && game.ExtraTime == "No") {
            return 'Win';
        } else if (game.TeamOneScore > game.TeamTwoScore && game.ExtraTime == "Yes") {
            return 'OTW';
        } else if (game.TeamOneScore == game.TeamTwoScore) {
            return 'Draw';
        } else if (game.TeamOneScore < game.TeamTwoScore && game.ExtraTime == "Yes") {
            return 'OTL';
        } else {
            return 'Loss';
        }
    } else if (team == `${teamsMAP.get(+game.TeamTwo)}`) {
        if (game.TeamTwoScore > game.TeamOneScore && game.ExtraTime == "No") {
            return 'Win';
        } else if (game.TeamTwoScore > game.TeamOneScore && game.ExtraTime == "Yes") {
            return 'OTW';
        } else if (game.TeamTwoScore == game.TeamOneScore) {
            return 'Draw';
        } else if (game.TeamTwoScore < game.TeamOneScore && game.ExtraTime == "Yes") {
            return 'OTL';
        } else {
            return 'Loss';
        }
    }
  }

export default getGameResultText;
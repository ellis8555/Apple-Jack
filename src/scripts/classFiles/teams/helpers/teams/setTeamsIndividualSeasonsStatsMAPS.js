import TeamStats from "../../teamStats";
import teamsMAP from "../../../../var_lib/maps/teams/teamsMAP";
import { SEASONS_WITH_TIE_GAMES} from "../../../../../constants/consts/vars";



function setTeamsIndividualSeasonsStatsMAPS(
    inputArray,
    writeToMAP,
    seasonNumber = currentSeason
  ) {
    // mode argument is either "combined season and playoffs", "season", "playoff"
    for (let i = 1; i <= teamsMAP.size; i++) {
      if (this.name == teamsMAP.get(i)) {
        // list team name to be associated with this MAP
        this[writeToMAP].set("Team", teamsMAP.get(i));
        // this seasons Games Played
        this[writeToMAP].set(
          "GP",
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].length
        );
        // this seasons Home Games
        this[writeToMAP].set(
          `season${seasonNumber}HomeGames`,
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
            (item) => item.TeamOne == i
          )
        );
        // this seasons Away Games
        this[writeToMAP].set(
          `season${seasonNumber}AwayGames`,
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
            (item) => item.TeamTwo == i
          )
        );
        // this seasons Home Wins
        this[writeToMAP].set(
          `season${seasonNumber}HomeWins`,
          this[writeToMAP]
            .get(`season${seasonNumber}HomeGames`)
            .filter(
              (item) => Number(item.TeamOneScore) > Number(item.TeamTwoScore)
            )
        );
        // this seasons Away Wins
        this[writeToMAP].set(
          `season${seasonNumber}AwayWins`,
          this[writeToMAP]
            .get(`season${seasonNumber}AwayGames`)
            .filter(
              (item) => Number(item.TeamOneScore) < Number(item.TeamTwoScore)
            )
        );
        // this seasons OT wins
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          //season withOUT ties
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
        // this seasons Wins
        this[writeToMAP].set(
          "Wins",
          this[writeToMAP].get(`season${seasonNumber}HomeWins`).length +
            this[writeToMAP].get(`season${seasonNumber}AwayWins`).length
        );
        // this seasons Draw games
        this[writeToMAP].set(
          "drawGames",
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray][0].filter(
            (item) => Number(item.TeamOneScore) == Number(item.TeamTwoScore)
          )
        );
        // this  seasons Draws
        this[writeToMAP].set("Draws", this[writeToMAP].get("drawGames").length);
        // this seasons home Losses
        this[writeToMAP].set(
          `season${seasonNumber}HomeLosses`,
          this[writeToMAP]
            .get(`season${seasonNumber}HomeGames`)
            .filter(
              (item) => Number(item.TeamOneScore) < Number(item.TeamTwoScore)
            )
        );
        // this seasons away Losses
        this[writeToMAP].set(
          `season${seasonNumber}AwayLosses`,
          this[writeToMAP]
            .get(`season${seasonNumber}AwayGames`)
            .filter(
              (item) => Number(item.TeamOneScore) > Number(item.TeamTwoScore)
            )
        );
        // this seasons OT Losses
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          // season withOUT ties
          this[writeToMAP].set(
            "OTL",
            this[writeToMAP]
              .get(`season${seasonNumber}HomeLosses`)
              .filter((item) => item.ExtraTime == "Yes").length +
              this[writeToMAP]
                .get(`season${seasonNumber}AwayLosses`)
                .filter((item) => item.ExtraTime == "Yes").length
          );
        }
        // this seasons Losses
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          // season with NO ties
          this[writeToMAP].set(
            "Losses",
            this[writeToMAP].get("GP") -
              (this[writeToMAP].get("Wins") + this[writeToMAP].get("OTL"))
          );
        } else {
          // season WITH ties
          this[writeToMAP].set(
            "Losses",
            this[writeToMAP].get("GP") -
              (this[writeToMAP].get("Wins") + this[writeToMAP].get("Draws"))
          );
        }

        // this seasons Points
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          // season withOUT ties
          this[writeToMAP].set(
            "Points",
            (this[writeToMAP].get("Wins") - this[writeToMAP].get("OTW")) * 3 +
              this[writeToMAP].get("OTW") * 2 +
              this[writeToMAP].get("OTL")
          );
        } else {
          // season WITH ties
          this[writeToMAP].set(
            "Points",
            this[writeToMAP].get("Wins") * 3 + this[writeToMAP].get("Draws")
          );
        }
        // this seasons Home Goals For
        if (
          this[writeToMAP].get(`season${seasonNumber}HomeGames`).length != 0
        ) {
          //check if any home games were even played
          this[writeToMAP].set(
            `season${seasonNumber}HomeGoalsFor`,
            this[writeToMAP]
              .get(`season${seasonNumber}HomeGames`)
              .map((item) => item.TeamOneScore)
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}HomeGoalsFor`, 0);
        }
        // this seasons Away Goals For
        if (
          this[writeToMAP].get(`season${seasonNumber}AwayGames`).length != 0
        ) {
          //check if any away games were even played
          this[writeToMAP].set(
            `season${seasonNumber}AwayGoalsFor`,
            this[writeToMAP]
              .get(`season${seasonNumber}AwayGames`)
              .map((item) => item.TeamTwoScore)
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}AwayGoalsFor`, 0);
        }
        // this seasons Goals For
        this[writeToMAP].set(
          "GF",
          +this[writeToMAP].get(`season${seasonNumber}HomeGoalsFor`) +
            +this[writeToMAP].get(`season${seasonNumber}AwayGoalsFor`)
        );
        // this seasons Home Goals Against
        if (
          this[writeToMAP].get(`season${seasonNumber}HomeGames`).length != 0
        ) {
          // check if any home games were even played
          this[writeToMAP].set(
            `season${seasonNumber}HomeGoalsAgainst`,
            this[writeToMAP]
              .get(`season${seasonNumber}HomeGames`)
              .map((item) => item.TeamTwoScore) // TeamTwo is opponent
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}HomeGoalsAgainst`, 0);
        }
        // this seasons Away Goals Against
        if (
          this[writeToMAP].get(`season${seasonNumber}AwayGames`).length != 0
        ) {
          this[writeToMAP].set(
            `season${seasonNumber}AwayGoalsAgainst`,
            this[writeToMAP]
              .get(`season${seasonNumber}AwayGames`)
              .map((item) => item.TeamOneScore) // TeamOne is opponent
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}AwayGoalsAgainst`, 0);
        }
        // this seasons Goals Against
        this[writeToMAP].set(
          "GA",
          +this[writeToMAP].get(`season${seasonNumber}HomeGoalsAgainst`) +
            +this[writeToMAP].get(`season${seasonNumber}AwayGoalsAgainst`)
        );
        // this seasons Goal Differential
        this[writeToMAP].set(
          "GD",
          +this[writeToMAP].get("GF") - +this[writeToMAP].get("GA")
        );
        // this seasons Goals For Average
        if (
          //check for teams that did not make the playoffs to avoid "NaN" result
          this[writeToMAP].get("GF") != 0 &&
          this[writeToMAP].get("GA") != 0
        ) {
          this[writeToMAP].set(
            "GFA",
            (+this[writeToMAP].get("GF") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
          // this seasons Goals Against Average
          this[writeToMAP].set(
            "GAA",
            (+this[writeToMAP].get("GA") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
        } else {
          this[writeToMAP].set("GFA", 0) && this[writeToMAP].set("GAA", 0);
        }
        // this seasons Home Possession For
        if (this[writeToMAP].get(`season${seasonNumber}HomeGames`) != 0) {
          this[writeToMAP].set(
            `season${seasonNumber}homePossessionFor`,
            this[writeToMAP]
              .get(`season${seasonNumber}HomeGames`)
              .map((item) => item.TeamOnePossession)
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}homePossessionFor`, 0);
        }
        // this seasons Away Possession For
        if (this[writeToMAP].get(`season${seasonNumber}AwayGames`) != 0) {
          this[writeToMAP].set(
            `season${seasonNumber}awayPossessionFor`,
            this[writeToMAP]
              .get(`season${seasonNumber}AwayGames`)
              .map((item) => item.TeamTwoPossession)
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}awayPossessionFor`, 0);
        }
        // this seasons Home Possession Against
        if (this[writeToMAP].get(`season${seasonNumber}HomeGames`) != 0) {
          this[writeToMAP].set(
            `season${seasonNumber}homePossessionAgainst`,
            this[writeToMAP]
              .get(`season${seasonNumber}HomeGames`)
              .map((item) => item.TeamTwoPossession) // TeamTwo is opponent
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}homePossessionAgainst`, 0);
        }
        // this seasons Away Possession Against
        if (this[writeToMAP].get(`season${seasonNumber}AwayGames`) != 0) {
          this[writeToMAP].set(
            `season${seasonNumber}awayPossessionAgainst`,
            this[writeToMAP]
              .get(`season${seasonNumber}AwayGames`)
              .map((item) => item.TeamOnePossession) // TeamOne is opponent
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set(`season${seasonNumber}awayPossessionAgainst`, 0);
        }
        // this seasons Possession For
        this[writeToMAP].set(
          "PF",
          +this[writeToMAP].get(`season${seasonNumber}homePossessionFor`) +
            +this[writeToMAP].get(`season${seasonNumber}awayPossessionFor`)
        );
        // this seasons Possession Against
        this[writeToMAP].set(
          "PA",
          +this[writeToMAP].get(`season${seasonNumber}homePossessionAgainst`) +
            +this[writeToMAP].get(`season${seasonNumber}awayPossessionAgainst`)
        );
        // this seasons possession For Average
        if (
          //check for teams that did not make the playoffs to avoid "NaN" result
          this[writeToMAP].get("PF") != 0 &&
          this[writeToMAP].get("PA") != 0
        ) {
          this[writeToMAP].set(
            "PFA",
            (+this[writeToMAP].get("PF") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
        } else {
          this[writeToMAP].set("PFA", 0);
        }
        // this seasons possession Against Average
        if (
          //check for teams that did not make the playoffs to avoid "NaN" result
          this[writeToMAP].get("PF") != 0 &&
          this[writeToMAP].get("PA") != 0
        ) {
          this[writeToMAP].set(
            "PAA",
            (+this[writeToMAP].get("PA") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
        } else {
          this[writeToMAP].set("PAA", 0);
        }
      }
    }
}

export default setTeamsIndividualSeasonsStatsMAPS;
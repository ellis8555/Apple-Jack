import TeamStats from "../../teamStats";
import teamsMAP from "../../../../var_lib/maps/teams/teamsMAP";

function setTeamsAllTimeStatsMAPS(inputArray, writeToMAP) {
    for (let i = 1; i <= teamsMAP.size; i++) {
      if (this.name == teamsMAP.get(i)) {
        // list team name to be associated with this MAP
        this[writeToMAP].set("Team", teamsMAP.get(i));
        // all Time Games Played
        this[writeToMAP].set(
          "GP",
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].length
        );
        // all Time Home Games
        this[writeToMAP].set(
          "allTimeHomeGames",
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
            (item) => item.TeamOne == i
          )
        );
        // all Time Away Games
        this[writeToMAP].set(
          "allTimeAwayGames",
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
            (item) => item.TeamTwo == i
          )
        );
        // all Time Home Wins
        this[writeToMAP].set(
          "allTimeHomeWins",
          this[writeToMAP]
            .get("allTimeHomeGames")
            .filter(
              (item) => Number(item.TeamOneScore) > Number(item.TeamTwoScore)
            )
        );
        // all Time Away Wins
        this[writeToMAP].set(
          "allTimeAwayWins",
          this[writeToMAP]
            .get("allTimeAwayGames")
            .filter(
              (item) => Number(item.TeamOneScore) < Number(item.TeamTwoScore)
            )
        );
        // all Time Wins
        this[writeToMAP].set(
          "Wins",
          this[writeToMAP].get("allTimeHomeWins").length +
            this[writeToMAP].get("allTimeAwayWins").length
        );
        // all Time Draws
        this[writeToMAP].set(
          "drawGames",
          TeamStats.allTeamStats[teamsMAP.get(i)][inputArray].filter(
            (item) => Number(item.TeamOneScore) == Number(item.TeamTwoScore)
          )
        );
        // all time Draws Length
        this[writeToMAP].set("Draws", this[writeToMAP].get("drawGames").length);
        // all Time Losses
        this[writeToMAP].set(
          "Losses",
          this[writeToMAP].get("GP") -
            (this[writeToMAP].get("Wins") + this[writeToMAP].get("Draws"))
        );
        // all Time Points
        this[writeToMAP].set(
          "Points",
          this[writeToMAP].get("Wins") * 3 + this[writeToMAP].get("Draws")
        );
        // all Time Home Goals For
        if (this[writeToMAP].get("allTimeHomeGames").length != 0) {
          //check if any home games were even played
          this[writeToMAP].set(
            "allTimeHomeGoalsFor",
            this[writeToMAP]
              .get("allTimeHomeGames")
              .map((item) => item.TeamOneScore)
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set("allTimeHomeGoalsFor", 0);
        }
        // all Time Away Goals For
        if (this[writeToMAP].get("allTimeAwayGames").length != 0) {
          //check if any away games were even played
          this[writeToMAP].set(
            "allTimeAwayGoalsFor",
            this[writeToMAP]
              .get("allTimeAwayGames")
              .map((item) => item.TeamTwoScore)
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set("allTimeAwayGoalsFor", 0);
        }
        // all Time Goals For
        this[writeToMAP].set(
          "GF",
          +this[writeToMAP].get("allTimeHomeGoalsFor") +
            +this[writeToMAP].get("allTimeAwayGoalsFor")
        );
        // all Time Home Goals Against
        if (this[writeToMAP].get("allTimeHomeGames").length != 0) {
          // check if any home games were even played
          this[writeToMAP].set(
            "allTimeHomeGoalsAgainst",
            this[writeToMAP]
              .get("allTimeHomeGames")
              .map((item) => item.TeamTwoScore) // TeamTwo is opponent
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set("allTimeHomeGoalsAgainst", 0);
        }
        // all Time Away Goals Against
        if (this[writeToMAP].get("allTimeAwayGames").length != 0) {
          this[writeToMAP].set(
            "allTimeAwayGoalsAgainst",
            this[writeToMAP]
              .get("allTimeAwayGames")
              .map((item) => item.TeamOneScore) // TeamOne is opponent
              .reduce((goalStart, goalAdd) => +goalStart + +goalAdd)
          );
        } else {
          this[writeToMAP].set("allTimeAwayGoalsAgainst", 0);
        }
        // all Time Goals Against
        this[writeToMAP].set(
          "GA",
          +this[writeToMAP].get("allTimeHomeGoalsAgainst") +
            +this[writeToMAP].get("allTimeAwayGoalsAgainst")
        );
        // all Time Goal Differential
        this[writeToMAP].set(
          "GD",
          +this[writeToMAP].get("GF") - +this[writeToMAP].get("GA")
        );
        // all Time Goals For Average
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
          // all Time Goals Against Average
          this[writeToMAP].set(
            "GAA",
            (+this[writeToMAP].get("GA") / +this[writeToMAP].get("GP")).toFixed(
              2
            )
          );
        } else {
          this[writeToMAP].set("GFA", 0) && this[writeToMAP].set("GAA", 0);
        }
        ////////////////////////
        // all Time Home Possession For
        if (this[writeToMAP].get("allTimeHomeGames") != 0) {
          this[writeToMAP].set(
            "homePossessionFor",
            this[writeToMAP]
              .get("allTimeHomeGames")
              .map((item) => item.TeamOnePossession)
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set("homePossessionFor", 0);
        }
        // all Time Away Possession For
        if (this[writeToMAP].get("allTimeAwayGames") != 0) {
          this[writeToMAP].set(
            "awayPossessionFor",
            this[writeToMAP]
              .get("allTimeAwayGames")
              .map((item) => item.TeamTwoPossession)
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set("awayPossessionFor", 0);
        }
        // all Time Home Possession Against
        if (this[writeToMAP].get("allTimeHomeGames") != 0) {
          this[writeToMAP].set(
            "homePossessionAgainst",
            this[writeToMAP]
              .get("allTimeHomeGames")
              .map((item) => item.TeamTwoPossession) // TeamTwo is opponent
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set("homePossessionAgainst", 0);
        }
        // all Time Away Possession Against
        if (this[writeToMAP].get("allTimeAwayGames") != 0) {
          this[writeToMAP].set(
            "awayPossessionAgainst",
            this[writeToMAP]
              .get("allTimeAwayGames")
              .map((item) => item.TeamOnePossession) // TeamOne is opponent
              .reduce((timeStart, timeAdd) => +timeStart + +timeAdd)
          );
        } else {
          this[writeToMAP].set("awayPossessionAgainst", 0);
        }
        // total Possession For
        this[writeToMAP].set(
          "PF",
          +this[writeToMAP].get("homePossessionFor") +
            +this[writeToMAP].get("awayPossessionFor")
        );
        // total Possession Against
        this[writeToMAP].set(
          "PA",
          +this[writeToMAP].get("homePossessionAgainst") +
            +this[writeToMAP].get("awayPossessionAgainst")
        );
        // possession For Average
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
        // possession Against Average
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

  export default setTeamsAllTimeStatsMAPS;
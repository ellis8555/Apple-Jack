// TeamStats is the class for team object creation
// allTeamStats (object) is the container holding each teams' object
// TeamStats.allTeamStats(<teamName>) is how to get within any teams' own object
// --------------------
//    "groupTeamsAllTimeStats", "groupTeamsAllTimeSeasonStats",
// "groupTeamsAllTimePlayoffStats", are static arrays for the class which hold each teams'
// MAPS that have each teams' all time stats reduced and ready for table display
// --------------------
// "groupTeamsSeason<seasonNumber>" followed either <CombinedStats>,<SeasonStats> or <PlayoffStats>
// are static arrays for the class which hold each teams' MAPS
// that have each teams' stats reduced per each season which is ready for table display
// --------------------
// sortGroupedTeamStats(<arrayName>, <fieldName>) is function to sort the static class arrays containing
// each teams' MAPS by category.
// SORT EXAMPLE
// sortGroupedTeamStats(
//   TeamStats[groupedAllTimeTeamStats[i]], // [groupedAllTimeTeamStats[i]] is a destructed array variable
//   "Losses" // change sort category here
// );

// destructured vars that are both in this class file and individualPlayerStats.js class file
// arrays from masterRecords.js
import {
  teams,
  players,
  gameType,
  teamPlayers,
  gameResults,
  gamePlayerStats,
} from "../masterVars.js";
// lengths of the above arrays
import {
  teamsLength,
  playersLength,
  gameTypeLength,
  teamPlayersLength,
  gameResultsLength,
  seasonCountLength,
  gamePlayerStatsLength,
} from "../masterVars.js";
// maps
import { teamsMAP, playersMAP, gameTypeMAP } from "../masterVars.js";
import { seasonCount } from "../masterVars.js";

import print from "../print.js";

// Vars for destructuring //

let supportVars = {
  seasonMode: ["Combined", "Season", "Playoff"],
  teamStatsFieldsAbbreviated: [
    "GP",
    "Win",
    "Loss",
    "Draw",
    "Points",
    "GF",
    "GA",
    "GD",
    "GFA",
    "GAA",
  ],
  teamStatsFields: [
    "GamesPlayed",
    "Win",
    "Loss",
    "Draw",
    "Points",
    "GoalsFor",
    "GoalsAgainst",
    "GoalDifferential",
    "GoalsForAverage",
    "GoalsAgainstAverage",
  ],
  teamStatsFieldNamesMAP: [
    "allTimeGamesPlayed",
    "allTimeWins",
    "allTimeLosses",
    "allTimeDrawsLength",
    "allTimePoints",
    "allTimeGoals",
    "allTimeGoalsAgainst",
    "allTimeGoalDifferential",
    "allTimeGoalsForAverage",
    "allTimeGoalsAgainstAverage",
  ],
  allTimeStatsArray: [
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats",
  ],
  allTimeStatsMAPS: [
    "allTimeStatsMAP",
    "allTimeSeasonStatsMAP",
    "allTimePlayoffStatsMAP",
  ],
  groupedAllTimeTeamStats: [
    "groupTeamsAllTimeStats",
    "groupTeamsAllTimeSeasonStats",
    "groupTeamsAllTimePlayoffStats",
  ],
  statsType: ["CombinedStats", "SeasonStats", "PlayoffStats"],
};

let {
  seasonMode,
  teamStatsFieldsAbbreviated,
  teamStatsFieldNamesMAP,
  teamStatsFields,
  allTimeStatsArray,
  allTimeStatsMAPS,
  groupedAllTimeTeamStats,
  statsType,
} = supportVars;

// End of destructured vars //

export class TeamStats {
  constructor(name) {
    // players name
    this.name = name;
    // all time team stats per object (team)
    this.allTimeStats = []; // collects from gameResults JSON
    this.allTimeSeasonStats = []; // gameResults JSON filtered to seasonType is "Season"
    this.allTimePlayoffStats = []; // gameResults JSON filtered to seasonType is "Playoff"
    this.allTimeStatsMAP = new Map();
    this.allTimeSeasonStatsMAP = new Map();
    this.allTimePlayoffStatsMAP = new Map();
    if (seasonCountLength > 1) {
      seasonCount.forEach((item) => {
        this["teamsSeason" + item + "CombinedStats"] = [];
        this["teamsSeason" + item + "SeasonStats"] = [];
        this["teamsSeason" + item + "PlayoffStats"] = [];
        this["teamsSeason" + item + "CombinedStatsMAP"] = new Map();
        this["teamsSeason" + item + "SeasonStatsMAP"] = new Map();
        this["teamsSeason" + item + "PlayoffStatsMAP"] = new Map();
      });
    }
  }

  // static properties and methods

  static allTeamStats = {}; // individual teams' instances of this class placed here

  // these arrays contain MAPS for each teams' all time totals ready for tabular display
  static groupTeamsAllTimeStats = [];
  static groupTeamsAllTimeSeasonStats = [];
  static groupTeamsAllTimePlayoffStats = [];

  // function for populating the class' group all time arrays
  static setGroupedAllTimeArrays() {
    for (let i = 0; i < allTimeStatsMAPS.length; i++) {
      for (let j = 1; j <= teamsMAP.size; j++) {
        this[groupedAllTimeTeamStats[i]].push(
          TeamStats.allTeamStats[teamsMAP.get(j)][allTimeStatsMAPS[i]]
        );
      }
    }
  }

  static setPerSeasonAllTimeContainers(seasonCountLength) {
    if (seasonCountLength > 1) {
      seasonCount.forEach((item) => {
        this["groupTeamsSeason" + item + "CombinedStats"] = [];
        this["groupTeamsSeason" + item + "SeasonStats"] = [];
        this["groupTeamsSeason" + item + "PlayoffStats"] = [];
      });
    }
  }

  // set teams all time stats arrays

  setTeamsAllTimeStats(allTimeArray, allTimeSeasonArray, allTimePlayoffArray) {
    // fills allTimeStats[]/seasonStats[]/playoff[]
    gameResults.forEach((item) => {
      if (
        teamsMAP.get(Number(item.TeamOne)) == this.name ||
        teamsMAP.get(Number(item.TeamTwo)) == this.name
      ) {
        this[allTimeArray].push(item);
      }
    });

    this[allTimeArray].forEach((item) => {
      for (let i = 0; i < gameResultsLength; i++) {
        // gameResultsLength
        if (
          item.GameID == gameResults[i].GameID &&
          gameTypeMAP.get(Number(gameResults[i].GameTypeID)) == "Season"
        )
          this[allTimeSeasonArray].push(item);
        if (
          item.GameID == gameResults[i].GameID &&
          gameTypeMAP.get(Number(gameResults[i].GameTypeID)) == "Playoff"
        )
          this[allTimePlayoffArray].push(item);
      }
    });
  }

  // set teams all time stats MAPS

  setTeamsAllTimeStatsMAPS(inputArray, writeToMAP) {
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

  setTeamsIndividualSeasonsStatsMAPS(inputArray, writeToMAP, seasonNumber) {
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
        // this seasons Losses
        this[writeToMAP].set(
          "Losses",
          this[writeToMAP].get("GP") -
            (this[writeToMAP].get("Wins") + this[writeToMAP].get("Draws"))
        );
        // this seasons Points
        this[writeToMAP].set(
          "Points",
          this[writeToMAP].get("Wins") * 3 + this[writeToMAP].get("Draws")
        );
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
}
//END OF CLASS

// create proper arrays and MAPS for when more than one season is played
TeamStats.setPerSeasonAllTimeContainers(seasonCountLength);

// INSTANTIATE team objects
// create objects for each team
for (let i = 1; i <= teamsMAP.size; i++) {
  TeamStats.allTeamStats[teamsMAP.get(i)] = new TeamStats(teamsMAP.get(i));

  // set arrays with each teams game data
  TeamStats.allTeamStats[teamsMAP.get(i)].setTeamsAllTimeStats(
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats"
  );

  // set grouped all time class MAPS data for each team
  for (let j = 0; j < allTimeStatsArray.length; j++) {
    TeamStats.allTeamStats[teamsMAP.get(i)].setTeamsAllTimeStatsMAPS(
      allTimeStatsArray[j],
      allTimeStatsMAPS[j]
    );
  }
}

// END of team object creation

TeamStats.setGroupedAllTimeArrays(); // populates the class arrays with team MAPS grouping for display of data in tabular form

// loop that fills each team's seasons combined stats array per each season number
if (seasonCount.length > 1) {
  //array for combined season and playoffs
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 0; j < seasonCountLength; j++) {
      TeamStats.allTeamStats[teamsMAP.get(i)][
        "teamsSeason" + seasonCount[j] + "CombinedStats"
      ].push(
        TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
          (item) => item.SeasonNumber == seasonCount[j]
        )
      );
    }
  }
}

// loop that fills each team's seasons regular season and playoff stats array
if (seasonCount.length > 1) {
  // arrays for regular season and playoffs per each season
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 0; j < seasonCountLength; j++) {
      // teamsSeason # SeasonStats poulation
      TeamStats.allTeamStats[teamsMAP.get(i)][
        "teamsSeason" + seasonCount[j] + "SeasonStats"
      ].push(
        TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
          // filter the teams all time array
          (item) =>
            item.SeasonNumber == seasonCount[j] &&
            gameTypeMAP.get(Number(item.GameTypeID)) == "Season"
        )
      );
      // teamsSeason # PlayoffStats poulation
      TeamStats.allTeamStats[teamsMAP.get(i)][
        "teamsSeason" + seasonCount[j] + "PlayoffStats"
      ].push(
        TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
          // filter the teams all time array
          (item) =>
            item.SeasonNumber == seasonCount[j] &&
            gameTypeMAP.get(Number(item.GameTypeID)) == "Playoff"
        )
      );
    }
  }
}

// loop that fills each teams individual seasons MAPS

if (seasonCount.length > 1) {
  for (let i = 1; i <= teamsMAP.size; i++) {
    for (let j = 1; j <= seasonCountLength; j++) {
      for (let k = 0; k < statsType.length; k++) {
        TeamStats.allTeamStats[
          teamsMAP.get(i)
        ].setTeamsIndividualSeasonsStatsMAPS(
          `teamsSeason${j}${statsType[k]}`, // input array
          `teamsSeason${j}${statsType[k]}MAP`, // output MAP
          j // season number
        );
      }
    }
  }
}
// SORTING FUNCTION
//sort function for sorting class' grouped arrays containing all team's MAPS

function sortGroupedTeamStats(inputArray, category) {
  inputArray.sort((a, b) => b.get(category) - a.get(category));
}

// this sorts the all time MAPS by entered field marked below
for (let i = 0; i < groupedAllTimeTeamStats.length; i++) {
  // groupedAllTimeTeamStats is destructured naming array
  sortGroupedTeamStats(
    TeamStats[groupedAllTimeTeamStats[i]],
    "Wins" // change sort category here
  );
}

// END SORTING

// CONSOLE LOG

print("Team stats: ");
print(teamsMAP);
// for (let i = 1; i <= teamsMAP.size; i++) {
//   print(TeamStats.allTeamStats[teamsMAP.get(i)].allTimeSeasonStatsMAP);
// }

print(TeamStats.groupTeamsAllTimeSeasonStats);
let playerStats = "";
let fields = [
  "Team",
  "GP",
  "Wins",
  "Losses",
  "Draws",
  "Points",
  "GF",
  "GFA",
  "GA",
  "GAA",
  "GD",
];
let fieldLength = fields.length;
playerStats = "<table>";
playerStats += "<caption>Season Standings</caption>";
playerStats += "<thead><tr>";
for (let i = 0; i < fieldLength; i++) {
  playerStats += "<th>" + fields[i] + "</th>";
}
playerStats += "</tr></thead>";

TeamStats.groupTeamsAllTimeSeasonStats.forEach((item) => {
  playerStats += "<tr>";
  for (let i = 0; i < fieldLength; i++) {
    playerStats += "<td>" + item.get(fields[i]) + "</td>";
  }
  playerStats += "</tr>";
});
playerStats += "</table>";

let x = document.getElementById("test");
x.innerHTML = playerStats;

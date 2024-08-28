import TeamStats from "../../teamStats";
import teamsMAP from "../../../../var_lib/maps/teams/teamsMAP";
import setGamesPlayed from "./helpers/setGamesPlayed";
import setHomeGames from "./helpers/setHomeGames";
import setAwayGames from "./helpers/setAwayGames";
import setHomeWins from "./helpers/setHomeWins";
import setAwayWins from "./helpers/setAwayWins";
import setWins from "./helpers/setWins";
import setDraws from "./helpers/setDraws";
import setLosses from "./helpers/setLosses";
import setPoints from "./helpers/setPoints";
import setHomeGoalsFor from "./helpers/setHomeGoalsFor";
import setAwayGoalsFor from "./helpers/setAwayGoalsFor";
import setGoalsFor from "./helpers/setGoalsFor";
import setHomeGoalsAgainst from "./helpers/setHomeGoalsAgainst";
import setAwayGoalsAgainst from "./helpers/setAwayGoalsAgainst";
import setGoalsAgainst from "./helpers/setGoalsAgainst";
import setGoalDifferential from "./helpers/setGoalDifferential";
import setGoalsForAverage from "./helpers/setGoalsForAverage";
import setGoalsAgainstAverage from "./helpers/setGoalsAgainstAverage";
import setHomePossessionFor from "./helpers/setHomePossessionFor";
import setAwayPossessionFor from "./helpers/setAwayPossessionFor";
import setHomePossessionAgainst from "./helpers/setHomePossessionAgainst";
import setAwayPossessionAgainst from "./helpers/setAwayPossessionAgainst";
import setPossessionFor from "./helpers/setPossessionFor";
import setPossessionAgainst from "./helpers/setPossessionAgainst";
import setPossessionForAverage from "./helpers/setPossessionForAverage";
import setPossessionAgainstAverage from "./helpers/setPossessionAgainstAverage";

function setTeamsAllTimeStatsMAPS(inputArray, writeToMAP) {
  const argsForStatMethods = {
    writeToMAP,
    teamsMAP,
    TeamStats,
    inputArray,
    seasonNumber: undefined
  }
  // below are fields for tables. example games played, goals for, possession for etc...
    for (let i = 1; i <= teamsMAP.size; i++) {
      if (this.name == teamsMAP.get(i)) {
        // list team name to be associated with this MAP
        this[writeToMAP].set("Team", teamsMAP.get(i));
        // all Time Games Played
        setGamesPlayed.call(this, i, argsForStatMethods)
        // all Time Home Games
        setHomeGames.call(this, i, argsForStatMethods)
        // all Time Away Games
        setAwayGames.call(this, i, argsForStatMethods)
        // all Time Home Wins
        setHomeWins.call(this, argsForStatMethods)
        // all Time Away Wins
        setAwayWins.call(this, argsForStatMethods)
        // all Time Wins
        setWins.call(this, argsForStatMethods)
        // all Time Draws
        setDraws.call(this, i, argsForStatMethods)
        // all Time Losses
        setLosses.call(this, argsForStatMethods)
        // all Time Points
        setPoints.call(this, argsForStatMethods)
        // all Time Home Goals For
        setHomeGoalsFor.call(this, argsForStatMethods)
        // all Time Away Goals For
        setAwayGoalsFor.call(this, argsForStatMethods)
        // all Time Goals For
        setGoalsFor.call(this, argsForStatMethods)
        // all Time Home Goals Against
        setHomeGoalsAgainst.call(this, argsForStatMethods)
        // all Time Away Goals Against
        setAwayGoalsAgainst.call(this, argsForStatMethods)
        // all Time Goals Against
        setGoalsAgainst.call(this, argsForStatMethods)
        // all Time Goal Differential
        setGoalDifferential.call(this, argsForStatMethods)
        // all Time Goals For Average
        setGoalsForAverage.call(this, argsForStatMethods)
          // all Time Goals Against Average
        setGoalsAgainstAverage.call(this, argsForStatMethods)
        // all Time Home Possession For
        setHomePossessionFor.call(this, argsForStatMethods)
        // all Time Away Possession For
        setAwayPossessionFor.call(this, argsForStatMethods)
        // all Time Home Possession Against
        setHomePossessionAgainst.call(this, argsForStatMethods)
        // all Time Away Possession Against
        setAwayPossessionAgainst.call(this, argsForStatMethods)
        // total Possession For
        setPossessionFor.call(this, argsForStatMethods)
        // total Possession Against
        setPossessionAgainst.call(this, argsForStatMethods)
        // possession For Average
        setPossessionForAverage.call(this, argsForStatMethods)
        // possession Against Average
        setPossessionAgainstAverage.call(this, argsForStatMethods)
      }
    }
  }

  export default setTeamsAllTimeStatsMAPS;
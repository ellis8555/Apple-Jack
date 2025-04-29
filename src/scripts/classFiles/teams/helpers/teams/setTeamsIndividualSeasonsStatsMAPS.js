import TeamStats from "../../teamStats";
import teamsMAP from "../../../../var_lib/maps/teams/teamsMAP";
import setGamesPlayed from "./helpers/setGamesPlayed";
import setHomeGames from "./helpers/setHomeGames";
import { SEASONS_WITH_TIE_GAMES} from "../../../../../constants/consts/vars";
import setAwayGames from "./helpers/setAwayGames";
import setHomeWins from "./helpers/setHomeWins";
import setAwayWins from "./helpers/setAwayWins";
import setDraws from "./helpers/setDraws";
import setWins from "./helpers/setWins";
import setOvertimeWins from "./helpers/setOvertimeWins";
import setHomeLosses from "./helpers/setHomeLosses";
import setAwayLosses from "./helpers/setAwayLosses";
import setOvertimeLosses from "./helpers/setOvertimeLosses";
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
import setShotsFor from "./helpers/setShotsFor";
import setShotsAgainst from "./helpers/setShotsAgainst";
import setSavePercentage from "./helpers/setSavePercentage";

function setTeamsIndividualSeasonsStatsMAPS(
    inputArray,
    writeToMAP,
    seasonNumber = currentSeason
  ) {
    const argsForStatMethods = {
      writeToMAP,
      teamsMAP,
      TeamStats,
      inputArray,
      seasonNumber
    }
    // mode argument is either "combined season and playoffs", "season", "playoff"
    for (let i = 1; i <= teamsMAP.size; i++) {
      if (this.name == teamsMAP.get(i)) {
        // list team name to be associated with this MAP
        this[writeToMAP].set("Team", teamsMAP.get(i));
        // this seasons Games Played
        setGamesPlayed.call(this, i, argsForStatMethods)
        // this seasons Home Games
        setHomeGames.call(this, i, argsForStatMethods)
        // this seasons Away Games
        setAwayGames.call(this, i, argsForStatMethods)
        // this seasons Home Wins
        setHomeWins.call(this, argsForStatMethods)
        // this seasons Away Wins
        setAwayWins.call(this, argsForStatMethods)
        // this seasons OT wins
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          //season withOUT ties
          setOvertimeWins.call(this, argsForStatMethods)
        }
        // this seasons Wins
        setWins.call(this, argsForStatMethods)
        // this seasons Draw games
        setDraws.call(this, i, argsForStatMethods)
        // this seasons home Losses
        setHomeLosses.call(this, argsForStatMethods)
        // this seasons away Losses
        setAwayLosses.call(this, argsForStatMethods)
        // this seasons OT Losses
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          // season withOUT ties
          setOvertimeLosses.call(this, argsForStatMethods)
        }
        // this seasons Losses
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          // season with NO ties
          setLosses.call(this, {seasonNumber, writeToMAP}, false)
        } else {
          // season WITH ties
          setLosses.call(this, {seasonNumber, writeToMAP}, true)
        }
        // this seasons Points
        if (!SEASONS_WITH_TIE_GAMES.includes(seasonNumber)) {
          // season withOUT ties
          setPoints.call(this, argsForStatMethods, false)
        } else {
          // season WITH ties
          setPoints.call(this, argsForStatMethods, true)
        }
        // this seasons Home Goals For
        setHomeGoalsFor.call(this, argsForStatMethods)
        // this seasons Away Goals For
        setAwayGoalsFor.call(this, argsForStatMethods)
        // this seasons Goals For
        setGoalsFor.call(this, argsForStatMethods)
        // this seasons Home Goals Against
        setHomeGoalsAgainst.call(this, argsForStatMethods)
        // this seasons Away Goals Against
        setAwayGoalsAgainst.call(this, argsForStatMethods)
        // this seasons Goals Against
        setGoalsAgainst.call(this, argsForStatMethods)
        // this seasons Goal Differential
        setGoalDifferential.call(this, argsForStatMethods)
        // this seasons Goals For Average
        setGoalsForAverage.call(this, argsForStatMethods)
        // this seasons Goals Against Average
        setGoalsAgainstAverage.call(this, argsForStatMethods)
        // this seasons shots on goal
        setShotsFor.call(this, argsForStatMethods)
        // this seasons shots against
        setShotsAgainst.call(this, argsForStatMethods)
        // this season save percentage
        setSavePercentage.call(this, argsForStatMethods)
        // this seasons Home Possession For
        setHomePossessionFor.call(this, argsForStatMethods)
        // this seasons Away Possession For
        setAwayPossessionFor.call(this, argsForStatMethods)
        // this seasons Home Possession Against
        setHomePossessionAgainst.call(this, argsForStatMethods)
        // this seasons Away Possession Against
        setAwayPossessionAgainst.call(this, argsForStatMethods)
        // this seasons Possession For
        setPossessionFor.call(this, argsForStatMethods)
        // this seasons Possession Against
        setPossessionAgainst.call(this, argsForStatMethods)
        // this seasons possession For Average
        setPossessionForAverage.call(this, argsForStatMethods)
        // this seasons possession Against Average
        setPossessionAgainstAverage.call(this, argsForStatMethods)
      }
    }
}

export default setTeamsIndividualSeasonsStatsMAPS;
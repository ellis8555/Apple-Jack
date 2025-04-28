import teamsMAP from "../../var_lib/maps/teams/teamsMAP"
import teamsSeasonsMAP from "../../var_lib/maps/teams/teamsSeasonsMAP"
import currentSeason from "../../var_lib/season/currentSeason"
import seasonCount from "../../var_lib/season/seasonCount"
import setTeamsAllTimeStats from "./helpers/teams/setTeamsAllTimeStats";
import setTeamsAllTimeStatsMAPS from "./helpers/teams/setTeamsAllTimeStatsMAPS";
import setTeamsIndividualSeasonsStatsMAPS from "./helpers/teams/setTeamsIndividualSeasonsStatsMAPS";
import { allTimeStatsMAPS, groupedAllTimeTeamStats } from "../../../constants/consts/supportVars";

class TeamStats {
    constructor(name) {
      // players name
      this.name = name;
      this.seasonsPlayed = teamsSeasonsMAP.get(this.name); // this MAP is key by team name with array value listing seasonNums
      this.seasonsPlayedLength = teamsSeasonsMAP.get(this.name).length;
      // all time team stats per object (team)
      this.allTimeStats = []; // collects from GameResults JSON
      this.allTimeSeasonStats = []; // GameResults JSON filtered to seasonType is "Season"
      this.allTimePlayoffStats = []; // GameResults JSON filtered to seasonType is "Playoff"
      this.teamsSeasonsPlayed = []; // unique list of which seasons this team played in
      this.allTimeStatsMAP = new Map();
      this.allTimeSeasonStatsMAP = new Map();
      this.allTimePlayoffStatsMAP = new Map();
  
      this.seasonsPlayed.forEach((item) => {
        this["teamsSeason" + item + "CombinedStats"] = [];
        this["teamsSeason" + item + "SeasonStats"] = [];
        this["teamsSeason" + item + "PlayoffStats"] = [];
        this["teamsSeason" + item + "CombinedStatsMAP"] = new Map();
        this["teamsSeason" + item + "SeasonStatsMAP"] = new Map();
        this["teamsSeason" + item + "PlayoffStatsMAP"] = new Map();
      });
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
  
    static setPerSeasonAllTimeContainers() {
      seasonCount.forEach((seasonNumber) => {
        this["groupTeamsSeason" + seasonNumber + "CombinedStats"] = [];
        this["groupTeamsSeason" + seasonNumber + "SeasonStats"] = [];
        this["groupTeamsSeason" + seasonNumber + "PlayoffStats"] = [];
      });
    }
  
    // set teams all time stats arrays
  
    setTeamsAllTimeStats(allTimeArray, allTimeSeasonArray, allTimePlayoffArray) {
      // fills allTimeStats[]/seasonStats[]/playoff[]
        setTeamsAllTimeStats.call(this, allTimeArray, allTimeSeasonArray, allTimePlayoffArray);
    }
  
    // set teams all time stats MAPS
  
    setTeamsAllTimeStatsMAPS(inputArray, writeToMAP) {
      setTeamsAllTimeStatsMAPS.call(this, inputArray, writeToMAP)
    }
  
    setTeamsIndividualSeasonsStatsMAPS(
      inputArray,
      writeToMAP,
      seasonNumber = currentSeason
    ) {
      // mode argument is either "combined season and playoffs", "season", "playoff"
      setTeamsIndividualSeasonsStatsMAPS.call(
        this, 
        inputArray,
        writeToMAP,
        seasonNumber)
    }
  }

  export default TeamStats;
import { GameResults, GamePlayerStats } from "../../constants/masterHaxData";
import playersMAP from "../var_lib/maps/players/playersMAP";
import playerSeasonsMAP from "../var_lib/maps/players/playerSeasonsMAP"
import gameTypeMAP from "../var_lib/maps/gameType/gameTypeMAP"
import seasonCount from "../var_lib/season/seasonCount"

const GameResultsLength = GameResults.length;

export default class IndividualPlayerStats {
    constructor(name) {
      // players name
      this.name = name;
      this.seasonsPlayed = playerSeasonsMAP.get(this.name);
      // all time player stats per object (player)
      this.allTimeStats = []; // collects from GamePlayerStats JSON
      this.allTimeSeasonStats = []; // GameResults JSON filtered to seasonType is "Season"
      this.allTimePlayoffStats = []; // GameResults JSON filtered to seasonType is "Playoff"
      this.allTimeStatsMAP = new Map();
      this.allTimeSeasonStatsMAP = new Map();
      this.allTimePlayoffStatsMAP = new Map();
      this.seasonsPlayed.forEach((item) => {
        this["playersSeason" + item + "CombinedStats"] = [];
        this["playersSeason" + item + "SeasonStats"] = [];
        this["playersSeason" + item + "PlayoffStats"] = [];
        this["playersSeason" + item + "CombinedStatsMAP"] = new Map();
        this["playersSeason" + item + "SeasonStatsMAP"] = new Map();
        this["playersSeason" + item + "PlayoffStatsMAP"] = new Map();
      });
    }
  
    // static properties and methods
  
    static allPlayersStats = {}; // individual players instances of this class placed here
    static playerStatsProfile = []; // same as above but in array form
  
    // these arrays contain MAPS for each players all time totals ready for tabular display
    static groupPlayersAllTimeStats = [];
    static groupPlayersAllTimeSeasonStats = [];
    static groupPlayersAllTimePlayoffStats = [];
  
    static setPerSeasonAllTimeContainers(seasonCountLength) {
      if (seasonCountLength > 1) {
        seasonCount.forEach((item) => {
          this["groupPlayersSeason" + item + "CombinedStats"] = [];
          this["groupPlayersSeason" + item + "SeasonStats"] = [];
          this["groupPlayersSeason" + item + "PlayoffStats"] = [];
        });
      }
    }
  
    // set player all time stats arrays
  
    setPlayersAllTimeStats(
      allTimeArray,
      allTimeSeasonArray,
      allTimePlayoffArray
    ) {
      // fills allTimeStats[]/seasonStats[]/playoff[]
      GamePlayerStats.forEach((item) => {
        if (playersMAP.get(Number(item.PlayerID)) == this.name) {
          this[allTimeArray].push(item);
        }
      });
  
      this[allTimeArray].forEach((item) => {
        for (let i = 0; i < GameResultsLength; i++) {
          // GameResultsLength
          if (
            item.GameID == GameResults[i].GameID &&
            gameTypeMAP.get(Number(GameResults[i].GameTypeID)) == "Season"
          )
            this[allTimeSeasonArray].push(item);
          if (
            item.GameID == GameResults[i].GameID &&
            gameTypeMAP.get(Number(GameResults[i].GameTypeID)) == "Playoff"
          )
            this[allTimePlayoffArray].push(item);
        }
      });
    }
  }
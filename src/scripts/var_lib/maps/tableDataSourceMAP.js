// import TeamStats from "../../scripts/classFiles/teamStats";
import TeamStats from "../../setTables/createTeam";
import IndividualPlayerStats from "../../setTables/createPlayer";
import seasonCount from "../../var_lib/season/seasonCount";

const seasonCountLength = seasonCount.length;
const tableDataSource = new Map();
tableDataSource
  // TEAMS GROUPINGS
  // ALL TIME
  .set(
    "TeamStats.groupTeamsAllTimeSeasonStats",
    TeamStats.groupTeamsAllTimeSeasonStats
  )
  .set(
    "TeamStats.groupTeamsAllTimePlayoffStats",
    TeamStats.groupTeamsAllTimePlayoffStats
  )
  .set("TeamStats.groupTeamsAllTimeStats", TeamStats.groupTeamsAllTimeStats);
  // EACH SEASONS TEAMS
  let statCategory = ["Season", "Playoff", "Combined"];
  for (let i = 0; i < statCategory.length; i++) {
    for (let j = 1; j <= seasonCountLength; j++) {
      const key = `groupTeamsSeason${j}${statCategory[i]}Stats`;
      tableDataSource.set(
        "TeamStats.groupTeamsSeason" + j + statCategory[i] + "Stats",
        TeamStats[key]
        // eval("TeamStats.groupTeamsSeason" + j + statCategory[i] + "Stats")
      );
    }
  }
// PLAYERS GROUPINGS
// ALL TIME PLAYERS
tableDataSource
  .set(
    "IndividualPlayerStats.groupPlayersAllTimeSeasonStats",
    IndividualPlayerStats.groupPlayersAllTimeSeasonStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersAllTimePlayoffStats",
    IndividualPlayerStats.groupPlayersAllTimePlayoffStats
  )
  .set(
    "IndividualPlayerStats.groupPlayersAllTimeStats",
    IndividualPlayerStats.groupPlayersAllTimeStats
  );
// EACH SEASONS PLAYERS

for (let i = 0; i < statCategory.length; i++) {
  for (let j = 1; j <= seasonCountLength; j++) {
    const key = `groupPlayersSeason${j}${statCategory[i]}Stats`;
    tableDataSource.set(
      "IndividualPlayerStats.groupPlayersSeason" +
        j +
        statCategory[i] +
        "Stats",
        IndividualPlayerStats[key]
      // eval(
      //   "IndividualPlayerStats.groupPlayersSeason" +
      //     j +
      //     statCategory[i] +
      //     "Stats"
      // )
    );
  }
}
// end seasons sets
export default tableDataSource;
import TeamStats from "../classFiles/teamStats";
import teamsMAP from "../var_lib/maps/teams/teamsMAP";
import gameTypeMAP from "../var_lib/maps/gameType/gameTypeMAP";
import seasonCount from "../var_lib/season/seasonCount";
import { allTimeStatsArray, allTimeStatsMAPS, statsType } from "../../constants/consts/supportVars";

const seasonCountLength = seasonCount.length;

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

// create proper arrays for holding team MAPS for when more than one season is played
TeamStats.setPerSeasonAllTimeContainers();
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

//array for combined season and playoffs
for (let i = 1; i <= teamsMAP.size; i++) {
  //     for (let j = 0; j < seasonCountLength; j++) { THIS WAS OLD FOR
  for (
    let j = 0;
    j < TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayedLength;
    j++
  ) {
    TeamStats.allTeamStats[teamsMAP.get(i)][
      "teamsSeason" +
        TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed[j] +
        "CombinedStats"
    ].push(
      TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
        (item) =>
          item.SeasonNumber ==
          TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed[j]
      )
    );
  }
}

// loop that fills each team's seasons regular season and playoff stats array

// arrays for regular season and playoffs per each season
for (let i = 1; i <= teamsMAP.size; i++) {
  for (
    let j = 0;
    j < TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayedLength;
    j++
  ) {
    // teamsSeason # SeasonStats poulation
    TeamStats.allTeamStats[teamsMAP.get(i)][
      "teamsSeason" +
        TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed[j] +
        "SeasonStats"
    ].push(
      TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
        // filter the teams all time array
        (item) =>
          item.SeasonNumber ==
            TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed[j] &&
          gameTypeMAP.get(Number(item.GameTypeID)) == "Season"
      )
    );
    // teamsSeason # PlayoffStats poulation
    TeamStats.allTeamStats[teamsMAP.get(i)][
      "teamsSeason" +
        TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed[j] +
        "PlayoffStats"
    ].push(
      TeamStats.allTeamStats[teamsMAP.get(i)].allTimeStats.filter(
        // filter the teams all time array
        (item) =>
          item.SeasonNumber ==
            TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed[j] &&
          gameTypeMAP.get(Number(item.GameTypeID)) == "Playoff"
      )
    );
  }
}

// loop that fills each teams individual seasons MAPS

for (let i = 1; i <= teamsMAP.size; i++) {
  TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed.forEach((item) => {
    for (let k = 0; k < statsType.length; k++) {
      TeamStats.allTeamStats[
        teamsMAP.get(i)
      ].setTeamsIndividualSeasonsStatsMAPS(
        `teamsSeason${item}${statsType[k]}`, // input array
        `teamsSeason${item}${statsType[k]}MAP`, // output MAP
        Number(item) // season number
      );
    }
  });
}

// loop that fills static arrays containing per season team stats for tabular data as per season
for (let i = 1; i <= teamsMAP.size; i++) {
  for (let j = 1; j <= seasonCountLength; j++) {
    if (
      TeamStats.allTeamStats[teamsMAP.get(i)].seasonsPlayed.includes(j)
    ) {
      for (let k = 0; k < statsType.length; k++) {
        TeamStats["groupTeamsSeason" + j + statsType[k]].push(
          TeamStats.allTeamStats[teamsMAP.get(i)][
            "teamsSeason" + j + statsType[k] + "MAP"
          ]
        );
      }
    }
  }
}

export default TeamStats ;
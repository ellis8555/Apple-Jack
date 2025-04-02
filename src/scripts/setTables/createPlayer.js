import IndividualPlayerStats from "../classFiles/players/individualPlayerStats";
import { GameResults } from "../../constants/masterHaxData";
import seasonCount from "../var_lib/season/seasonCount";
import playersMAP from "../var_lib/maps/players/playersMAP";
import gameTypeMAP from "../var_lib/maps/gameType/gameTypeMAP"
import { playerStatsFields, allTimeStatsArray, allTimeStatsMAPS, groupedAllTimePlayerStats, perSeasonCats, perSeasonCatMAPS } from "../../constants/consts/supportVars";

// IndividualPlayerStats is the class each players' object creation
// allPLayersStats (object) is the container holding each players' object
// IndividualPlayerStats.allPlayersStats(<playerName>) is how to get within any players' own object
// --------------------
//    "groupPlayersAllTimeStats", "groupPlayersAllTimeSeasonStats",
// "groupPlayersAllTimePlayoffStats", are static arrays for the class which hold each players'
// MAPS that have each players' all time stats reduced and ready for table display
// --------------------
//    "groupPlayersSeason<number> followed with either <CombinedStats>,<SeasonStats> or <PlayoffStats>,
// are static arrays for the class which hold each players'
// MAPS that have each players' all time stats reduced and ready for table display
// --------------------
// Each players' own object contains various arrays and MAPS that are both "allTime" and "per season"
// which the array holds each record that the player is directly in and MAPS which reduce the arrays
// into single totals ready to be displayed in table form
// --------------------
// sortGroupedPlayerStats(<arrayName>, <fieldName>) is function to sort the static class arrays containing
// each players' MAPS by category.
// SORT EXAMPLE
// sortGroupedPlayerStats(
//   IndividualPlayerStats[groupedAllTimePlayerStats[i]],
//   "Points" // change sort category here
// );

const gameResultsLength = GameResults.length;
const seasonCountLength = seasonCount.length;

// instantiating the class and all related objects
IndividualPlayerStats.setPerSeasonAllTimeContainers(seasonCountLength);
for (let i = 1; i <= playersMAP.size; i++) {
  IndividualPlayerStats.allPlayersStats[playersMAP.get(i)] =
  new IndividualPlayerStats(playersMAP.get(i));
  
  IndividualPlayerStats.allPlayersStats[
    playersMAP.get(i)
  ].setPlayersAllTimeStats(
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats"
  );
}
// all time MAPS for each player
for (let i = 1; i <= playersMAP.size; i++) {
  for (let j = 0; j < allTimeStatsArray.length; j++) {
    for (let k = 0; k < playerStatsFields.length; k++) {
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].set(
        playerStatsFields[k],
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          allTimeStatsArray[j]
        ]
          .map((item) => Number(item[playerStatsFields[k]]))
          .reduce((current, adjusted) => current + adjusted, 0)
      );
    }
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
      allTimeStatsMAPS[j]
    ].set(
      "GP",
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsArray[j]
      ].length
    );
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
      allTimeStatsMAPS[j]
    ].set(
      "Points",
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].get("Assists") +
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          allTimeStatsMAPS[j]
        ].get("Goals")
    );

    // prevent 0/0 if goals and shots on goal are both zeros
    if(
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].get("Goals") &&
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].get("ShotsOnGoal") !== 0
    ){
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].set(
        "Shooting%",
        Math.round(
        (
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          allTimeStatsMAPS[j]
        ].get("Goals") / 
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          allTimeStatsMAPS[j]
        ].get("ShotsOnGoal")
      )*100
    ) + "%"
      );
    }else{
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        allTimeStatsMAPS[j]
      ].set(
        "Shooting%",
        "0%"
      );
    }
  }
}

// update each players stats to includes those that had to step in to play for another team.

// loop through player objects and find those that begin with double star (**) as this indicates 
// those players who have played for another team during a single season
for (let playersName in IndividualPlayerStats.allPlayersStats){
  // extract players alternate name
  if(playersName[0] && playersName[1] === "*"){
    // get players main user name
    const playersMainName = playersName.slice(2);
    // for each alternate players games push them into players all time main stats
    // this will be alltime for all, season, and playoffs 
    for(let i = 0; i < allTimeStatsArray.length; i++){
        for(let j = 0; j < IndividualPlayerStats.allPlayersStats[playersName][allTimeStatsArray[i]].length; j++){
          IndividualPlayerStats.allPlayersStats[playersMainName][allTimeStatsArray[i]].push(
            IndividualPlayerStats.allPlayersStats[playersName][allTimeStatsArray[i]][j]
          )
        }
    }

    // update the players all time maps which produces that players stats such as goals, pts, games played etc...
    for (let j = 0; j < allTimeStatsArray.length; j++) {
      for (let k = 0; k < playerStatsFields.length; k++) {
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsMAPS[j]
        ].set(
          playerStatsFields[k],
          IndividualPlayerStats.allPlayersStats[playersMainName][
            allTimeStatsArray[j]
          ]
            .map((item) => Number(item[playerStatsFields[k]]))
            .reduce((current, adjusted) => current + adjusted, 0)
        );
      }
      IndividualPlayerStats.allPlayersStats[playersMainName][
        allTimeStatsMAPS[j]
      ].set(
        "GP",
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsArray[j]
        ].length
      );
      IndividualPlayerStats.allPlayersStats[playersMainName][
        allTimeStatsMAPS[j]
      ].set(
        "Points",
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsMAPS[j]
        ].get("Assists") +
          IndividualPlayerStats.allPlayersStats[playersMainName][
            allTimeStatsMAPS[j]
          ].get("Goals")
      );
      // prevent 0/0 if goals and shots on goal are both zeros
      if(
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsMAPS[j]
        ].get("Goals") &&
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsMAPS[j]
        ].get("ShotsOnGoal") !== 0
      ){
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsMAPS[j]
        ].set(
          "Shooting%",
          Math.round(
            (
              IndividualPlayerStats.allPlayersStats[playersMainName][
                allTimeStatsMAPS[j]
              ].get("Goals") /
                IndividualPlayerStats.allPlayersStats[playersMainName][
                  allTimeStatsMAPS[j]
                ].get("ShotsOnGoal")
            )*100
          ) + "%"
        );
      }else{
        IndividualPlayerStats.allPlayersStats[playersMainName][
          allTimeStatsMAPS[j]
        ].set(
          "Shooting%",
          "0%"
        );
      }
    }
  }
}
// finally sort the all games array by order of gameID.
IndividualPlayerStats.allPlayersStats['Skills324']['allTimeStats'].sort((a, b) => {
  return a.GameID - b.GameID
})

// loop that fills each players seasons stats per each season
// array for specific season, that seasons playoff and also combined season and playoffs

// if (seasonCount.length > 1) {
//array for combined season and playoffs

for (let i = 1; i <= playersMAP.size; i++) {
  let playersSeasonAppearances =
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
  for (let j = 0; j < playersSeasonAppearances.length; j++) {
    IndividualPlayerStats.allPlayersStats[
      playersMAP.get(i)
    ].allTimeStats.forEach((item) => {
      for (let k = 0; k < gameResultsLength; k++) {
        if (
          item.GameID == GameResults[k].GameID &&
          GameResults[k].SeasonNumber == playersSeasonAppearances[j]
        )
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + playersSeasonAppearances[j] + "CombinedStats"
          ].push(item);
      }
    });
  }
}

// array for specific for season and seperately playoff

for (let i = 1; i <= playersMAP.size; i++) {
  let playersSeasonAppearances =
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
  for (let j = 0; j < playersSeasonAppearances.length; j++) {
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
      "playersSeason" + playersSeasonAppearances[j] + "CombinedStats"
    ].forEach((item) => {
      for (let k = 0; k < gameResultsLength; k++) {
        if (
          item.GameID == GameResults[k].GameID &&
          GameResults[k].SeasonNumber == playersSeasonAppearances[j] &&
          gameTypeMAP.get(Number(GameResults[k].GameTypeID)) == "Playoff"
        )
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + playersSeasonAppearances[j] + "PlayoffStats"
          ].push(item);
        if (
          item.GameID == GameResults[k].GameID &&
          GameResults[k].SeasonNumber == playersSeasonAppearances[j] &&
          gameTypeMAP.get(Number(GameResults[k].GameTypeID)) == "Season"
        )
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + playersSeasonAppearances[j] + "SeasonStats"
          ].push(item);
      }
    });
  }
}

//////////////////////Individual player season MAPS
for (let i = 1; i <= playersMAP.size; i++) {
  let seasonsPlayedIn =
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
  for (let j = 0; j < seasonsPlayedIn.length; j++) {
    for (let l = 0; l < perSeasonCatMAPS.length; l++) {
      for (let k = 0; k < playerStatsFields.length; k++) {
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].set(
          playerStatsFields[k],
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonsPlayedIn[j] + perSeasonCats[l]
          ]
            .map((item) => Number(item[playerStatsFields[k]]))
            .reduce((current, adjusted) => current + adjusted, 0)
        );
      }
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
      ].set(
        "GP",
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + [perSeasonCats[l]]
        ].length
      );
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
        "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
      ].set(
        "Points",
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].get("Assists") +
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
          ].get("Goals")
      );
      // prevent 0/0 if goals and shots on goal are both zeros
      if(
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].get("Goals") &&
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].get("ShotsOnGoal")
        !== 0
      ){
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].set(
          "Shooting%",
          Math.round(
            (
              IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
                "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
              ].get("Goals") /
                IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
                  "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
                ].get("ShotsOnGoal")
            )*100
          ) + "%"
        );
      }
      else {
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + perSeasonCatMAPS[l]
        ].set(
          "Shooting%",
          "0%"
        );
      }
    }
  }
}
// } // end of if season is greater than 1
////////////BEGIN of populating arrays for tabular style data. All time and per season with varying modes. (alltime, season and playoffs)
// copying allPlayerStats objects contents into array form in order to use array functionality
for (let i = 1; i <= playersMAP.size; i++) {
  IndividualPlayerStats.playerStatsProfile.push(
    IndividualPlayerStats.allPlayersStats[playersMAP.get(i)]
  );
}

// seperating playerStatsProfile array (each player) into allTime, Season and Playoff arrays
IndividualPlayerStats.playerStatsProfile.forEach((item) => {
  for (let i = 0; i < groupedAllTimePlayerStats.length; i++) {
    item[allTimeStatsMAPS[i]].set("Name", item.name); // MAP needs name to associate who owns the stats
    IndividualPlayerStats[groupedAllTimePlayerStats[i]].push(
      item[allTimeStatsMAPS[i]]
    );
  }
});

// seperating playerStatsProfile array (each player) into per each Season stats ready for tabular data
if (seasonCount.length > 1) {
  for (let i = 1; i <= playersMAP.size; i++) {
    let seasonsPlayedIn =
      IndividualPlayerStats.allPlayersStats[playersMAP.get(i)].seasonsPlayed;
    for (let j = 0; j < seasonsPlayedIn.length; j++) {
      for (let k = 0; k < perSeasonCats.length; k++) {
        IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
          "playersSeason" + seasonsPlayedIn[j] + [perSeasonCatMAPS[k]]
        ].set("Name", playersMAP.get(i));
        IndividualPlayerStats[
          "groupPlayersSeason" + seasonsPlayedIn[j] + [perSeasonCats[k]]
        ].push(
          IndividualPlayerStats.allPlayersStats[playersMAP.get(i)][
            "playersSeason" + seasonsPlayedIn[j] + [perSeasonCatMAPS[k]]
          ]
        );
      }
    }
  }
}

// adjust shooting % for players who played in season one.
// there is no shots on goal data so subtract goals from first season
// shooting % is actually for seasons 2 onwards
for (let i = 1; i <= playersMAP.size; i++){
  const seasonsPlayed = IndividualPlayerStats.allPlayersStats[playersMAP.get(i)]["seasonsPlayed"]
  const player = IndividualPlayerStats.allPlayersStats[playersMAP.get(i)]
  if(seasonsPlayed.includes(1) && seasonsPlayed.some(season => season != 1)){
  for(let j = 0; j < allTimeStatsArray.length; j++){
    const allTimeGoals = player[allTimeStatsMAPS[j]].get("Goals");
    const allTimeShotsOngoal = player[allTimeStatsMAPS[j]].get("ShotsOnGoal");
    const firstSeasonGoals = player["playersSeason1" + perSeasonCatMAPS[j]].get("Goals");
    player[allTimeStatsMAPS[j]].set("Shooting%", 
      Math.round(
        (
          (allTimeGoals - firstSeasonGoals)/allTimeShotsOngoal
        )*100
      ) + "%"
    )
  }
  }
}
// EXPORTS

export default IndividualPlayerStats;
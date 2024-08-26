function playerSorting(inputArray, category){
    if(category == "Points"){
        inputArray.sort((a, b) =>{
          const pointStandings = b.get(category) - a.get(category)

                // if points are not tied then return
      if(pointStandings !== 0){
        return pointStandings;
      }

            // if points are tied then add sort by less games played

            const gamesPlayedStandings = a.get('GP') - b.get('GP');

            if(gamesPlayedStandings !== 0){
              return gamesPlayedStandings
            }

            // if points and games played tied sort by goals scored

            const goalsScored = b.get('Goals') - a.get('Goals');

            if(goalsScored !== 0){
              return goalsScored
            }

            // final sort by shots on goal

            const shotsOnGoal = b.get('ShotsOnGoal') - a.get('ShotsOnGoal');

            if(shotsOnGoal !== 0){
              return shotsOnGoal
            }
        })
        return inputArray;
      }
      return inputArray.sort((a, b) => b.get(category) - a.get(category));
}

export default playerSorting;
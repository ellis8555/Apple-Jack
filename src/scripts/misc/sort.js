// used to sort tabular data from both teams and players objects

export default function sortGroupedStats(inputArray, category) {
  // this for sorting team standings. player tables don't have team key
  if(inputArray[0].has('Team')){
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

      // if points and games played tied sort by goal differential

      const goalDifference = b.get('GF') - a.get('GF');

      if(goalDifference !== 0){
        return goalDifference
      }

    });

      return inputArray
  }
      // this for sorting player tables as teams don't have assists key
    } else if(inputArray[0].has('Assists')) {
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
      }
      return inputArray;
    } else {
      return inputArray.sort((a, b) => b.get(category) - a.get(category));
    }
  }
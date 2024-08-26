function teamSorting(inputArray, category){
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
  
        const goalDifference = b.get('GD') - a.get('GD');
  
        if(goalDifference !== 0){
          return goalDifference
        }
  
      });
      return inputArray
    }
   return inputArray.sort((a, b) => b.get(category) - a.get(category));
}

export default teamSorting;
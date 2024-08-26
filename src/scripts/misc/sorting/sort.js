// used to sort tabular data from both teams and players objects
import teamSorting from "./helpers/teamSorting";
import playerSorting from "./helpers/playerSorting";

export default function sortGroupedStats(inputArray, category) {
  // this for sorting team standings. player tables don't have team key
  if(inputArray[0].has('Team')){
    return teamSorting(inputArray, category)
  }
  
      // this for sorting player tables as teams don't have assists key
    if(inputArray[0].has('Assists')) {
      return playerSorting(inputArray, category)
    }
}

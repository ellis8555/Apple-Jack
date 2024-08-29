import debounce from "../../../../misc/debounce"
import playerBoxscoreTableListeners from "./playerBoxscoreTableListeners";

function updatePlayersBoxscoreTableResizeListener({thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor}){
    // resize event method
function handleResize() {
    let playerStatsContainer = document.querySelector("#boxscorePlayerStats");
    if (playerStatsContainer) {
        playerBoxscoreTableListeners({ thisGamesPlayerStatMAPS, thisGamesHomeTeamPlayerNames, thisGamesHomeTeamColor, thisGamesAwayTeamColor })
    }
  }
  
  // Throttled version of the resize listener
  const debouncedResize = debounce(handleResize, 500); // Adjust the limit (in milliseconds) as needed

  let playerStatsContainer = document.querySelector("#boxscorePlayerStats");
  if (playerStatsContainer) {
    window.addEventListener('resize', debouncedResize);
  } else {
    window.removeEventListener('resize', debouncedResize);
  }
}

export default updatePlayersBoxscoreTableResizeListener;
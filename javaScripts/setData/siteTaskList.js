import {
  closeSidebar,
  clearScoreboardDiv,
} from "../functions/variousFunctions.js";

export function displayTaskList() {
  clearScoreboardDiv();
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `<div class="w3-content w3-margin w3-padding w3-round-large w3-display-container w3-margin-top w3-card-4 w3-text-black">
  <p><b>*</b> HaxBall main logo is a link back to home settings of the page. <b>*</b></p>
  <p><b>**</b> Tables are sortable via clicking the field header. On mobile click on any row <b>**</b></p>
  <p><b>***</b> Team pages player stats are NOT sortable at this point <b>***</b></p>
 
    <h3>List of site improvements</h3>
    <p>1. Improve teams game results page. Add logos/game stats/gifs</p> 
    <h3>In no particular order..</h3>
    <p>Sidebar improvement</p>
    <p>Improve the little logo for the site. Used in bookmarks/tabs.</p>
    <p>
      Have beside a particular game result a "replay" button that if possible
      links to a haxball site that loads replays for recorded games.
    </p>
    <p>Develop a particular players own stats page</p>
    <p>
      Have particular highlights associated with a player on that players own
      page. Gifs of that players goals on there own page.
    </p>
    <p>Logging game stats via the site.</p>
    <h3>Message</h3>  
  
  
    <p>The player stats that have been logged have been changed as in a games replay there are different stats that are recorded by the game. For instance the game does not have "own goals" or "saves". Also when totals rang up for a teams total goals for the season these numbers did not match the total goals from the players on that team. This is where I evenly distributed missing tallies.</p>
  </div>`;
  closeSidebar();
}

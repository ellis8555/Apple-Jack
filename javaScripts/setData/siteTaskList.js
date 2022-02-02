import { closeSidebar, clearScoreboardDiv } from "../oldDesign/hax94.js";

export function displayTaskList() {
  clearScoreboardDiv();
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `<div class="w3-content w3-margin w3-padding w3-round-large w3-display-container w3-margin-top w3-card-4 w3-text-black">
  <h3>Message</h3>  
  
    <p>The player stats that have been logged have been changed as in a games replay there are different stats that are recorded by the game. For instance the game does not have "own goals" or "saves". Also when totals rang up for a teams total goals for the season these numbers did not match the total goals from the players on that team. This is where I evenly distributed missing tallies.</p>
    <h3>List of site improvements</h3>
    <p>1. Improve team data page.</p>
    <p>2. Gif highlights. Somewhere located near a game result have access to that games giffy highlights.</p>
    <p>In no particular order..</p>
    <p>playoffs page of some sort.</p>
    <p>For each game result have all that games data appear if clicked on.</p>
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
  </div>`;
  closeSidebar();
}

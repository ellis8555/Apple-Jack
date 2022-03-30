import {
  closeSidebar,
  clearScoreboardDiv,
} from "../functions/variousFunctions.js";

export function displayTaskList() {
  clearScoreboardDiv();
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `<div class="w3-content w3-margin w3-padding w3-round-large w3-display-container w3-margin-top w3-card-4 w3-text-black">
  <p style="background-color:red;">This information will be deleted in the near future. The site has been established and Discord provides for good messaging!</p>
  <p><b>*</b> HaxBall main logo is a link back to home settings of the page. <b>*</b></p>
  <p><b>**</b> Tables are sortable via clicking the field header. On mobile click on any row <b>**</b></p>
 

    <h3>List of site improvements</h3> 
    <h4>In no particular order..</h4>
    <p>Adjust correct champions logo when clicking on previous seasons tables</p>
    <p>More stats for tables. ex. shooting percentage, clean sheets, points per game average, etc....</p>
    <p>Sortable tables within a teams players' list of players</p>
    <p>Some kind of playoff tree visual</p>
    <p>Develop a particular players own stats page</p>
    <p>
    Have particular highlights associated with a player on that players own
    page. Gifs of that players goals on there own page.
  </p>
    <p>League records. ex. Most goals scored in a game etc...</p>
    <p>More sidebar improvement</p>
    <p>Improve the little logo for the site. Used in bookmarks/tabs.</p>
    <p>Logging game stats via the site.</p>
    <h3>Message</h3>  
  
  
    <p>The player stats that have been logged have been changed as in a games replay there are different stats that are recorded by the game. For instance the game does not have <del>"own goals"</del> or "saves".
    <b>Edit</b>: The replay analyzer does in fact record own goals! <del>Also when totals rang up for a teams total goals for the season these numbers did not match the total goals from the players on that team. 
    This is where I evenly distributed missing tallies</del>. <del>This will be adjusted back due to own goals actually being a game stat!</del>For now I'll leave it as is. Not sure what to do with season one stats at this point?</p>
  </div>`;
  closeSidebar();
}

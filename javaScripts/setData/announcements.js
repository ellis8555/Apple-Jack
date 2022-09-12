import {
  closeSidebar,
  clearScoreboardDiv,
} from "../functions/variousFunctions.js";

export function displayTaskList() {
  clearScoreboardDiv();
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `<div class="w3-content w3-margin w3-padding w3-round-large w3-display-container w3-margin-top w3-card-4 w3-text-black">
  <div style="margin: auto; width:90%; background-color: rgb(34, 184, 34);"><h5>Season 3 beginning very soon!</h5></div>
  <p style="background-color: orange;"><b>A first league record stat has been completed laying out the framework for more stats in the future!</b></p>
  <b>*</b> HaxBall main logo is a link back to home settings of the page. <b>*</b></p>
  <p><b>**</b> Tables are sortable via clicking the field header. On mobile click on any row <b>**</b></p>
  </div>`;
  closeSidebar();
}

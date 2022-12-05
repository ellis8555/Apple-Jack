import {
  closeSidebar,
  clearScoreboardDiv,
} from "../functions/variousFunctions.js";

export function displayTaskList() {
  clearScoreboardDiv();
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `<div class="w3-content w3-margin w3-padding w3-round-large w3-display-container w3-margin-top w3-card-4 w3-text-black">
  <div style="margin: auto; width:90%; background-color: #572317;color: #82E66E"><h5>Haxual Chocolate are Season 3 Champions!</h5></div>
  <p style="background-color: orange;"><b>A tonne of stats yet to be created over time. A playoff page, list of Champions etc...</b></p>
  <b>*</b> HaxBall main logo is a link back to home settings of the page. <b>*</b></p>
  <p><b>**</b> Tables are sortable via clicking the field header. On mobile click on any row <b>**</b></p>
  </div>`;
  closeSidebar();
}

import {
  clearScoreboardDiv,
  clearTablesDiv,
  getScoreboardDiv,
  getTablesDiv,
} from "../../variousFunctions.js";

export default function createRecordDisplay(title) {
  getTablesDiv();
  let displayRecord = ``;
  displayRecord += `<div class="w3-container w3-card w3-round w3-blue"`;
  // title div
  displayRecord += `<div class="w3-card recordTitle">`;
  displayRecord += `${title}`;
  // end title div
  displayRecord += `</div>`;
  //end display container div
  displayRecord += "</div>";
  tablesDiv.innerHTML = displayRecord;
}

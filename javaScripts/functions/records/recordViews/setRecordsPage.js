import {
  clearScoreboardDiv,
  clearTablesDiv,
  getTablesDiv,
} from "../../variousFunctions.js";
import createRecordsLayout from "./createRecordsLayout.js";
import teamGoalsScored from "../teamRecords/teamGoalsScored/teamGoalsScored.js";

export default function setRecordsPage() {
  clearTablesDiv();
  clearScoreboardDiv();
  getTablesDiv();

  // create records containing div
  let recordsContainer = document.createElement("div");
  recordsContainer.classList =
    "recordsContainer w3-panel w3-round w3-card w3-blue";

  // fetch the records nav buttons and append to the records container div
  const recordsNav = createRecordsLayout();
  recordsContainer.append(recordsNav);

  // append all the records and navbar to the webpage
  tablesDiv.append(recordsContainer);
}

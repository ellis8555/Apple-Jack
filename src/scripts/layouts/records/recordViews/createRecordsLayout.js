import teamGoalsScored from "../teamRecords/teamGoalsScored/teamGoalsScored.js";
import createRecordsForm from "./recordViewHtmlTemplates/recordsForm.js";
import getSelectValues from "../genericRecordFunctions/getSelectValues.js";

export default function createRecordsLayout() {
  // create records nav that will contain allTime/season/playoffs buttons
  let recordsNav = document.createElement("div");
  recordsNav.classList = "recordsNav w3-panel w3-round";
  const recordsForm = createRecordsForm()
  recordsNav.append(recordsForm); 

  // // create season button
  // let recordsSeasonButton = document.createElement("div");
  // recordsSeasonButton.classList = "w3-round w3-card";
  // recordsSeasonButton.setAttribute("data-seasonMode", "Season");
  // recordsSeasonButton.innerHTML = "Season";
  // recordsNav.append(recordsSeasonButton);
  // // create playoffs button
  // let recordsPlayoffsButton = document.createElement("div");
  // recordsPlayoffsButton.classList = "w3-round w3-card";
  // recordsPlayoffsButton.setAttribute("data-seasonMode", "Playoff");
  // recordsPlayoffsButton.innerHTML = "Playoff";
  // recordsNav.append(recordsPlayoffsButton);
  // // create all time button
  // let recordsAllTimeButton = document.createElement("div");
  // recordsAllTimeButton.classList = "w3-round w3-card";
  // recordsAllTimeButton.setAttribute("data-seasonMode", "AllTime");
  // recordsAllTimeButton.innerHTML = "All Time";
  // recordsNav.append(recordsAllTimeButton); 

  return recordsNav;
}

import closeSidebar from "../../sidebar/closeSidebar.js";
import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv.js";
import getTablesDiv from "../../tables/getTablesDiv.js"
import AnnouncementsPageLayout from "./AnnouncementsPageLayout.js";

function setAnnouncements() {
  clearScoreboardDiv();
  
  // Get the display area where you want to add content
  let displayArea = getTablesDiv();

  // Clear any existing content in the display area
  displayArea.innerHTML = '';

displayArea.append(AnnouncementsPageLayout())

  // Close the sidebar
  closeSidebar();
}

export default setAnnouncements;

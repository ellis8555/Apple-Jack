import leagueTeamRecords from "../../layouts/records/teamRecords/teamRecordsExports"
import closeSidebar from "../../sidebar/closeSidebar";

// league records
document
  .getElementById("leagueRecords")
  .addEventListener("click", () => {
    leagueTeamRecords.setRecordsPageNav();
    setTimeout(() => {
      closeSidebar()
    }, 50)
  });
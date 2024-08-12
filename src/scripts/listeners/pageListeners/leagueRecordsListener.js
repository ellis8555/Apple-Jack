import leagueTeamRecords from "../../layouts/records/teamRecords/teamRecordsExports"

// league records
document
  .getElementById("leagueRecords")
  .addEventListener("click", leagueTeamRecords.setRecordsPageNav);
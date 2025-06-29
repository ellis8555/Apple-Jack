import teamGoalsScored from "./teamGoalsScored/teamGoalsScored.js";
import setRecordsPage from "../recordViews/setRecordsPage.js";
import showSelectedRecords from "../genericRecordFunctions/showSelectedRecords.js";

const leagueTeamRecords = {
  // set records page nav
  setRecordsPageNav: setRecordsPage,
  // teamGoalsScord.js
  teamGoals: teamGoalsScored,
  setListenersOnFormSelects: function(){
    const getRecordsFormSelects = document.querySelectorAll('select')
    getRecordsFormSelects.forEach(select => {
        select.addEventListener('change', showSelectedRecords)
    })
  }
};

export default leagueTeamRecords;

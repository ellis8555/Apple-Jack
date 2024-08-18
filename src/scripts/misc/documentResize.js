import setMainNavbar from "../layouts/navbar/setMainNavbar";
import screenResize from "./screenResize";
import getTeamsPlayersPerSeason from "../layouts/teamPlayerList";

function resizeEventMethod() {
  // screen size for navbar layout adapting to a screen resize event
  const screenWidth = window.innerWidth;
  const tableCaption = document.querySelector(
    `#tablesDiv > table > caption > h1`
  );
    // 7 is season number position on home page table which is the current season
    let getSeasonNumber;
    if(tableCaption){
      getSeasonNumber = +tableCaption.textContent[7]
      if (isNaN(getSeasonNumber)) {
        // 2 is season number position for tables not on the home page
        getSeasonNumber = +tableCaption.textContent[2];
      }
    } 
    // season number can become lost resulting in undefined
    if(tableCaption == undefined){
      const getSeasonNumberFromNavbarDataAttribute = +document.querySelectorAll("img[data-team-name]")[0].dataset.seasonNum;
      getSeasonNumber = getSeasonNumberFromNavbarDataAttribute
    }
    if (screenWidth < 500) {
      // this if checks for players all time stats as these table headers do not contain a number
      if (isNaN(getSeasonNumber)) {
        setMainNavbar();
      } else {
        // if mobile screen and more teams than 5 then add another row to navbar teams layout
        setMainNavbar(getSeasonNumber);
      }
    } else if (screenWidth > 500) {
      // this if checks for players all time stats as these table headers do not contain a number
      if (isNaN(getSeasonNumber)) {
        setMainNavbar();
      } else {
        // if mobile screen and more teams than 5 then add another row to navbar teams layout
        setMainNavbar(getSeasonNumber);
      }
    }
    // end navbar layout
    // this is for on teams page players list and there respective stats tables
    let getTeamPlayerSeasonTable = document.querySelectorAll(
      "#teamPlayerSeasonTable"
    );
    let getTeamPlayerPlayoffTable = document.querySelectorAll(
      "#teamPlayerPlayoffTable"
    );
    let getTeamPlayerCombinedTable = document.querySelectorAll(
      "#teamPlayerCombinedTable"
    );
      if (getTeamPlayerSeasonTable.length == 0) {
        screenResize();
      } else {
        let teamPlayerBackButton = document.getElementById("playerStatsBackButton");
        // e is undefined so given value of false
        // 2nd, 3rd and 4th arguments
        let team = teamPlayerBackButton.dataset.teamName;
        let seasonNumber = teamPlayerBackButton.dataset.seasonNum;
        let teamLogo = teamPlayerBackButton.dataset.teamLogo;
        // 5th argument season table
        let getSeasonTableData = document.querySelectorAll(
          "#teamPlayerSeasonTable td[class='w3-yellow']"
        );
        let getSeasonSelectedField = getSeasonTableData[0].dataset.fieldName;
        // 6th argument playoff table
        let getPlayoffSelectedField;
        if (getTeamPlayerPlayoffTable.length > 0) {
          let getPlayoffTableData = document.querySelectorAll(
            "#teamPlayerPlayoffTable td[class='w3-yellow']"
          );
          getPlayoffSelectedField = getPlayoffTableData[0].dataset.fieldName;
        } else {
          getPlayoffSelectedField = "Points";
        }
        // 7th argument
        let getCombinedSelectedField;
        if (getTeamPlayerCombinedTable.length > 0) {
          let getCombinedTableData = document.querySelectorAll(
            "#teamPlayerCombinedTable td[class='w3-yellow']"
          );
          getCombinedSelectedField = getCombinedTableData[0].dataset.fieldName;
        } else {
          getCombinedSelectedField = "Points";
        }
    
        getTeamsPlayersPerSeason(
          false,
          team,
          seasonNumber,
          teamLogo,
          getSeasonSelectedField,
          getPlayoffSelectedField,
          getCombinedSelectedField
        );
      }
}

  export default resizeEventMethod;
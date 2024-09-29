import setMainNavbar from "../layouts/navbar/setMainNavbar";
import screenResize from "./screenResize";
import getTeamsPlayersPerSeason from "../layouts/teamPlayerList/teamPlayerList";

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
    // season number can become lost resulting in undefined so grab season number from navbar element with season-num data attribute
    if(tableCaption == null){
      const getSeasonNumberFromNavbarDataAttribute = +document.querySelectorAll("div[data-season-num]")[0]?.dataset.seasonNum;
      getSeasonNumber = getSeasonNumberFromNavbarDataAttribute
      // there is a bug when showing playoff tree that reduces season number by one so add one back when playoff tree
      const isPlayoffTree = document.querySelector(".playoffTree h3");
      if(isPlayoffTree){
        getSeasonNumber = +isPlayoffTree.textContent[7]
      } 
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
        // if large screen and more teams than 5 then add another row to navbar teams layout
        setMainNavbar(getSeasonNumber);
      }
    }
    // end navbar layout
    // this is for on teams page players list and there respective stats tables
    const getTeamPlayerSeasonTable = document.querySelectorAll(
      "#teamPlayerSeasonTable"
    );
    const getTeamPlayerPlayoffTable = document.querySelectorAll(
      "#teamPlayerPlayoffTable"
    );
    const getTeamPlayerCombinedTable = document.querySelectorAll(
      "#teamPlayerCombinedTable"
    );
      if (getTeamPlayerSeasonTable.length == 0) {
        screenResize();
      } else {
        const teamPlayerBackButton = document.getElementById("playerStatsBackButton");
        // e is undefined so given value of false
        // 2nd, 3rd and 4th arguments
        const team = teamPlayerBackButton.dataset.teamName;
        const seasonNumber = teamPlayerBackButton.dataset.seasonNum;
        const teamLogo = teamPlayerBackButton.dataset.teamLogo;
        // 5th argument season table
        const getSeasonTableData = document.querySelectorAll(
          "#teamPlayerSeasonTable td[class='w3-yellow']"
        );
        const getSeasonSelectedField = getSeasonTableData[0].dataset.fieldName;
        // 6th argument playoff table
        let getPlayoffSelectedField;
        if (getTeamPlayerPlayoffTable.length > 0) {
          const getPlayoffTableData = document.querySelectorAll(
            "#teamPlayerPlayoffTable td[class='w3-yellow']"
          );
          getPlayoffSelectedField = getPlayoffTableData[0].dataset.fieldName;
        } else {
          getPlayoffSelectedField = "Points";
        }
        // 7th argument
        let getCombinedSelectedField;
        if (getTeamPlayerCombinedTable.length > 0) {
          const getCombinedTableData = document.querySelectorAll(
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
          getSeasonSelectedField,
          getPlayoffSelectedField,
          getCombinedSelectedField
        );
      }
}

  export default resizeEventMethod;
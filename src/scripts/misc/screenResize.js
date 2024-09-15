import sortTable from "./sortTable";
import setTeamsTableBgColor from "./setTeamsTableBgColor";
import { TABLE_BREAK_POINT } from "../../constants/consts/vars";

export default function screenResize() {
// if on boxscore page that has players table just return and exit 
const boxscorePlayerStats = document.getElementById("boxscorePlayerStats");
if (boxscorePlayerStats) {
  return;
}

  // insert fetch data function onto <TD> elements in mobile view
  const screenSize = window.innerWidth;
  const teamPlayersDataSource = document.getElementById("playerStatsBackButton");
  if (!teamPlayersDataSource) {
    const regularScreen = document.querySelectorAll("#tablesDiv table th");
    const mobileTableData = document.querySelectorAll("#tablesDiv table td");
    if (screenSize < TABLE_BREAK_POINT) {
      mobileTableData.forEach((item) =>
        item.addEventListener("click", sortTable)
      );
      setTeamsTableBgColor();
    } else {
      regularScreen.forEach((item) =>
        item.addEventListener("click", sortTable)
      );
    }
  }
}

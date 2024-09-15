import { TABLE_BREAK_POINT } from "../../../../constants/consts/vars"

function setTeamPlayerTableListeners(tableId, tableToSort){
    let browserWidth = window.innerWidth;
    let getTable = document.querySelectorAll(`#${tableId}`);
    // test if team made playoffs
    if (getTable.length > 0) {
      // for mobile screens
      if (browserWidth < TABLE_BREAK_POINT) {
        getTable[0].onclick = function (e) {
          let td = e.target.closest("td");
          if (!td) return;
          tableToSort(e);
        };
      }
      // for larger screens
      else {
        getTable[0].onclick = function (e) {
          let th = e.target.closest("th");
          if (!th) return;
          tableToSort(e);
        };
      }
    } else {
      return;
    }
}

export default setTeamPlayerTableListeners
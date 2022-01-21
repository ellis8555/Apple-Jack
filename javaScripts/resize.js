import { sortTable } from "./setData/setTables/teamsTables.js";

export default function screenResize() {
  // insert fetch data function onto <TD> elements in mobile view
  let screenSize = window.innerWidth;
  let regularScreen = document.querySelectorAll("#tablesDiv table th");
  let mobileTableData = document.querySelectorAll("#tablesDiv table td");
  if (screenSize < 993) {
    mobileTableData.forEach((item) =>
      item.addEventListener("click", sortTable)
    );
  } else {
    regularScreen.forEach((item) => item.addEventListener("click", sortTable));
  }
}

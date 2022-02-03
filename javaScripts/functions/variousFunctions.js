export function openSidebar() {
  document.getElementById("sidebar").style.display = "block";
}

export function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}

export function clearScoreboardDiv() {
  let scoreboardDiv = document.getElementById("scoreboardDiv");
  scoreboardDiv.innerHTML = "";
}

export function getTablesDiv() {
  let tablesDiv = document.getElementById("tablesDiv");
  return tablesDiv;
}

export function clearTablesDiv() {
  let previousData = document.getElementById("tablesDiv");
  previousData.innerHTML = "";
}

// this code for sidebar "other stats" link

export function displaySlides() {
  clearScoreboardDiv();
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `
  <img
    class="w3-image"
    src="img/S01_Stats/S01_Playoff_Bracket.JPG"
    alt="Playoff bracket"
    style="width: 100%"
  />
<!--end of slides-->`;
  closeSidebar();
}

import { defendingChamps } from "../../json/masterVars.js";

// SIDEBAR RELATED
export function openSidebar() {
  document.getElementById("sidebar").style.display = "block";
}

export function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}

// HEADER DIV CONTENT

// change header banner when team is selected from navbar

export function setHeaderBanner(imgSource, team) {
  // note this is not the champions banner
  let headerImage = document.querySelector("#championsCard>div>img");
  headerImage.src = imgSource;
  let header = document.getElementById("headerTeamName");
  let headerChildren = header.childNodes;
  headerChildren[4].textContent = team;
  // add champions name here to display trophy icon when champion team selected
  let trophy = document.querySelector("i");
  if (team == defendingChamps) {
    trophy.classList.add("fa-trophy");
  } else {
    trophy.classList.remove("fa-trophy");
  }
}

// MAIN CONTENT DIVS

export function clearScoreboardDiv() {
  let scoreboardDiv = document.getElementById("scoreboardDiv");
  scoreboardDiv.style.display = "";
  scoreboardDiv.style.flexDirection = "";
  scoreboardDiv.style.alignItems = "";
  scoreboardDiv.innerHTML = "";
}

export function getScoreboardDiv() {
  let scoreboardDiv = document.getElementById("scoreboardDiv");
  return scoreboardDiv;
}

export function getTablesDiv() {
  let tablesDiv = document.getElementById("tablesDiv");
  return tablesDiv;
}

export function clearTablesDiv() {
  let previousData = document.getElementById("tablesDiv");
  previousData.innerHTML = "";
}

export default function clearScoreboardDiv() {
    let scoreboardDiv = document.getElementById("scoreboardDiv");
    scoreboardDiv.style.display = "";
    scoreboardDiv.style.flexDirection = "";
    scoreboardDiv.style.alignItems = "";
    scoreboardDiv.innerHTML = "";
  }
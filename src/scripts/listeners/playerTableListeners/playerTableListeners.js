import setPlayersFullTable from "../../tables/setPlayersFullTable";
import setPlayersAllTimeTable from "../../tables/setPlayersAllTimeTable";

// Players tables
// all time player stats
document
  .getElementById("allTimePlayerPointsTable")
  .addEventListener("click", () => {
    setPlayersAllTimeTable(0, "", "Stats");
});
document
  .getElementById("allTimePlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersAllTimeTable(0, "Season", "Season Stats");
});
document
  .getElementById("allTimePlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersAllTimeTable(0, "Playoff", "Playoff Stats");
});
// season 04 players tables
document
  .getElementById("s04PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable();
});
// season 03 player tables
document
  .getElementById("s03PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable(3);
});
document
  .getElementById("s03PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(3, "Playoff", "Playoffs");
});
document
  .getElementById("s03PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(3, "Combined", "Combined");
});
// season 02 player tables
document
  .getElementById("s02PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable(2);
});
document
  .getElementById("s02PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(2, "Playoff", "Playoffs");
});
document
  .getElementById("s02PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(2, "Combined", "Combined");
});
// season 03 player tables
document
  .getElementById("s01PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable(1);
});
document
  .getElementById("s01PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(1, "Playoff", "Playoffs");
});
document
  .getElementById("s01PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(1, "Combined", "Combined");
});
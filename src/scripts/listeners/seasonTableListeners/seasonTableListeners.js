import setSeasonsFullTable from "../../tables/setSeasonsFullTable";

// teams tables
// season 04 standings tables
document
  .getElementById("s04RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable()
});
// season 03 standings tables
document
  .getElementById("s03RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(3)
});
document
  .getElementById("s03PlayoffTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(3, "Playoff", "Playoffs")
});
document
  .getElementById("s03CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(3, "Combined", "Combined")
});
// season 02 standings tables
document
  .getElementById("s02RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(2)
});
document
  .getElementById("s02PlayoffTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(2, "Playoff", "Playoffs")
});
document
  .getElementById("s02CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(2, "Combined", "Combined")
});
// season 01 standings tables
document
  .getElementById("s01RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(1)
});
document
  .getElementById("s01PlayoffTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(1, "Playoff", "Playoffs")
});
document
  .getElementById("s01CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(1, "Combined", "Combined")
});

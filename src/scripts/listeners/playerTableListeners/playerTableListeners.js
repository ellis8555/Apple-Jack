import setPlayersFullTable from "../../tables/setPlayersFullTable";
import setPlayersAllTimeTable from "../../tables/setPlayersAllTimeTable";
import closeSidebar from "../../sidebar/closeSidebar";

// Players tables
// all time player stats
document
  .getElementById("allTimePlayerPointsTable")
  .addEventListener("click", () => {
    setPlayersAllTimeTable(0, "", "Stats");
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("allTimePlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersAllTimeTable(0, "Season", "Season Stats");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("allTimePlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersAllTimeTable(0, "Playoff", "Playoff Stats");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 04 players tables
document
  .getElementById("s04PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable();
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s04PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(4, "Playoff", "Playoffs");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s04PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(4, "Combined", "Combined");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 03 player tables
document
  .getElementById("s03PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable(3);
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s03PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(3, "Playoff", "Playoffs");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s03PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(3, "Combined", "Combined");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 02 player tables
document
  .getElementById("s02PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable(2);
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s02PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(2, "Playoff", "Playoffs");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s02PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(2, "Combined", "Combined");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 03 player tables
document
  .getElementById("s01PlayerSeasonTable")
  .addEventListener("click", () => {
    setPlayersFullTable(1);
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s01PlayerPlayoffTable")
  .addEventListener("click", () => {
    setPlayersFullTable(1, "Playoff", "Playoffs");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s01PlayerCombinedTable")
  .addEventListener("click", () => {
    setPlayersFullTable(1, "Combined", "Combined");
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
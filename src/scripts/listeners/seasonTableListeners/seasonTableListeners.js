import playoffTree from "../../layouts/playoffTree/playoffTree";
import closeSidebar from "../../sidebar/closeSidebar";
import setSeasonsFullTable from "../../tables/setSeasonsFullTable";

// teams tables
// season 05 standings tables
document
  .getElementById("s05RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable()
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 04 standings tables
document
  .getElementById("s04RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(4)
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s04PlayoffTree")
  .addEventListener("click", () => {
    playoffTree(4)
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s04CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(4, "Combined", "Combined")
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 03 standings tables
document
  .getElementById("s03RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(3)
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s03PlayoffTable")
  .addEventListener("click", () => {
    playoffTree(3)
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s03CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(3, "Combined", "Combined")
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 02 standings tables
document
  .getElementById("s02RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(2)
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s02PlayoffTree")
  .addEventListener("click", () => {
    playoffTree(2)
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s02CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(2, "Combined", "Combined")
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
// season 01 standings tables
document
  .getElementById("s01RegularSeason")
  .addEventListener("click", () => {
    setSeasonsFullTable(1)
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s01PlayoffTree")
  .addEventListener("click", () => {
    playoffTree(1)
        setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById("s01CombinedTable")
  .addEventListener("click", () => {
    setSeasonsFullTable(1, "Combined", "Combined")
        setTimeout(() => {
      closeSidebar();
    }, 50);
});

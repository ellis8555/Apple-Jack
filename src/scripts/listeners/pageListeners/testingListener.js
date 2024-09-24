import playoffTree from "../../layouts/playoffTree/playoffTree";
import closeSidebar from "../../sidebar/closeSidebar";

// league records
document
  .getElementById("testingPlayoffTree")
  .addEventListener("click", () => {
    playoffTree();
    setTimeout(() => {
      closeSidebar()
    }, 50)
  });
import playoffTree from "../../layouts/playoffTree/playoffTree";
import closeSidebar from "../../sidebar/closeSidebar";
import setSeasonsFullTable from "../../tables/setSeasonsFullTable";
import seasonCount from "../../var_lib/season/seasonCount";

for(let i = seasonCount.length; i>0; i--){
  document
  .getElementById(`s0${i}RegularSeason`)
  .addEventListener("click", () => {
    setSeasonsFullTable(i)
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById(`s0${i}PlayoffTree`)
  .addEventListener("click", () => {
    playoffTree(i)
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
document
  .getElementById(`s0${i}CombinedTable`)
  .addEventListener("click", () => {
    setSeasonsFullTable(i, "Combined", "Combined")
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
}

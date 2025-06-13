import playoffTree from "../../layouts/playoffTree/playoffTree";
import closeSidebar from "../../sidebar/closeSidebar";
import setSeasonsFullTable from "../../tables/setSeasonsFullTable";
import seasonCount from "../../var_lib/season/seasonCount";
import { IN_BETWEEN_SEASONS, IS_PLAYOFFS } from "../../../constants/consts/vars";

const latestSeason = seasonCount.at(-1)

for(let i = seasonCount.length; i>0; i--){
  document
  .getElementById(`s0${i}RegularSeason`)
  .addEventListener("click", () => {
    setSeasonsFullTable(i)
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
if(!latestSeason){
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
if(latestSeason && IN_BETWEEN_SEASONS && IS_PLAYOFFS){
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
}

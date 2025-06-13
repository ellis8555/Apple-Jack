import setPlayersFullTable from "../../tables/setPlayersFullTable";
import setPlayersAllTimeTable from "../../tables/setPlayersAllTimeTable";
import closeSidebar from "../../sidebar/closeSidebar";
import seasonCount from "../../var_lib/season/seasonCount";
import { IN_BETWEEN_SEASONS, IS_PLAYOFFS } from "../../../constants/consts/vars";

const latestSeason = seasonCount.at(-1)

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

// season 05 players tables
for(let i = seasonCount.length; i>0; i--){
  document
  .getElementById(`s0${i}PlayerSeasonTable`)
  .addEventListener("click", () => {
    setPlayersFullTable(i)
    setTimeout(() => {
      closeSidebar();
    }, 50);
});
if(!latestSeason){
  document
    .getElementById(`s0${i}PlayerPlayoffTable`)
    .addEventListener("click", () => {
      setPlayersFullTable(i, "Playoff", "Playoffs")
      setTimeout(() => {
        closeSidebar();
      }, 50);
  });
  document
    .getElementById(`s0${i}PlayerCombinedTable`)
    .addEventListener("click", () => {
      setPlayersFullTable(i, "Combined", "Combined")
      setTimeout(() => {
        closeSidebar();
      }, 50);
  });
}
if(latestSeason && IN_BETWEEN_SEASONS && IS_PLAYOFFS){
    document
    .getElementById(`s0${i}PlayerPlayoffTable`)
    .addEventListener("click", () => {
      setPlayersFullTable(i, "Playoff", "Playoffs")
      setTimeout(() => {
        closeSidebar();
      }, 50);
  });
  document
    .getElementById(`s0${i}PlayerCombinedTable`)
    .addEventListener("click", () => {
      setPlayersFullTable(i, "Combined", "Combined")
      setTimeout(() => {
        closeSidebar();
      }, 50);
  });
}
}
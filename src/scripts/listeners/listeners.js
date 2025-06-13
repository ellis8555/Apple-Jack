import setHomeTable from "../tables/setHomeTable";
import resizeEventMethod from "../misc/documentResize";
import debounce from "../misc/debounce";

// menu bar listeners
import "./menubarListeners/menubarListeners"
// set listeners on season standings in menu
import "../listeners/seasonTableListeners/seasonTableListeners"
// set listeners on player tables in menu
import "../listeners/playerTableListeners/playerTableListeners"
// announcements page listener
import "./pageListeners/announcementsListener"
// records page listener
import "./pageListeners/leagueRecordsListener"
import playoffTree from "../layouts/playoffTree/playoffTree";
import currentSeason from "../var_lib/season/currentSeason";
import { IN_BETWEEN_SEASONS } from "../../constants/consts/vars";

  // add link to haxball logo 
  const headerLogo = document.querySelector("img[alt*='Haxball']");
  // setHomeTable or playoffs depending on if playoffs are currently ongoing
  if(IN_BETWEEN_SEASONS){
    headerLogo.addEventListener("click", () => {playoffTree(currentSeason)});
  } else {
    headerLogo.addEventListener("click", () => {setHomeTable()});
  }

// keeps tables fields correctly highlighted on windows resize

const debouncedResizeEventMethod = debounce(resizeEventMethod, 50);
window.addEventListener('resize', debouncedResizeEventMethod)
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

  // add link to haxball logo 
  const headerLogo = document.querySelector("img[alt*='Haxball']");
  // setHomeTable or playoffs depending on if playoffs are currently ongoing
  headerLogo.addEventListener("click", playoffTree);

// keeps tables fields correctly highlighted on windows resize

const debouncedResizeEventMethod = debounce(resizeEventMethod, 50);
window.addEventListener('resize', debouncedResizeEventMethod)
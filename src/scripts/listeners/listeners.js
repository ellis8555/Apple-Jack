import setHomeTable from "../tables/setHomeTable";
import resizeEventMethod from "../misc/documentResize";

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

  // add link to haxball logo 
  const headerLogo = document.querySelector("img[alt*='Haxball']");
  headerLogo.addEventListener("click", setHomeTable);

// keeps tables fields correctly highlighted on windows resize

  window.addEventListener('resize', resizeEventMethod)
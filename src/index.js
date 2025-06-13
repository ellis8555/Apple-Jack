// css files
import "./css/w3.css"
import "./css/general.css"
import "./css/large.css"
import "./css/medium.css"
import "./css/mobileLandscape.css"
import "./css/mobile.css"
import "./css/playoffTree.css"
// js files
import "./scripts/listeners/listeners"
import setHomeTable from "./scripts/tables/setHomeTable"
import playoffTree from "./scripts/layouts/playoffTree/playoffTree"
import setSeasonsFullTable from "./scripts/tables/setSeasonsFullTable"
import setTableListeners from "./scripts/listeners/listenerHelpers/setTableListeners"
import "./scripts/listeners/tablesDivObserver"

// img files all imported using script
import images from "./scripts/loadImages";
import currentSeason from "./scripts/var_lib/season/currentSeason"
    //////////////////////////////////////////////////
    // Set homepage standings table for current season
    //////////////////////////////////////////////////
    // setHomeTable();
    ///////////////////
    // during playoffs
    ///////////////////
    // setSeasonsFullTable(5, "Playoff", "Playoffs")
    playoffTree(currentSeason)
    // Set listeners on table headers
    setTableListeners();
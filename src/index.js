// css files
import "./css/w3.css"
import "./css/general.css"
import "./css/large.css"
import "./css/medium.css"
import "./css/mobileLandscape.css"
import "./css/mobile.css"
// js files
import "./scripts/listeners/listeners"
import setHomeTable from "./scripts/tables/setHomeTable"
import setSeasonsFullTable from "./scripts/tables/setSeasonsFullTable"
import setTableListeners from "./scripts/listeners/listenerHelpers/setTableListeners"

// img files all imported using script
import images from "./scripts/loadImages";

    // Set homepage standings table for current season
    // setHomeTable();
    // during playoffs
    setSeasonsFullTable(4, "Playoff", "Playoffs")
    // Set listeners on table headers
    setTableListeners();
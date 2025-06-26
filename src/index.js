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
    // service worker for caching begin checking local storage first
    const getLastModifedJson = await fetch("https://hax94-league.s3.us-east-2.amazonaws.com/json/haxLastModified.json")
    const response = await getLastModifedJson.json()
    const lastModified = response['lastModified']
    let isHaxDataUpdated
    let getLastModifiedHaxData = localStorage.getItem("haxDataLastModified")
    if(getLastModifiedHaxData == null){
        localStorage.setItem("haxDataLastModified", lastModified)
        isHaxDataUpdated = false
    } else {
        isHaxDataUpdated = lastModified === getLastModifiedHaxData ? true : false
        if(!isHaxDataUpdated){
            localStorage.setItem("haxDataLastModified", lastModified)
        }
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            if(registration.active){
                registration.active.postMessage({type: "LAST_MODIFIED", payload: isHaxDataUpdated})
            } else {
                navigator.serviceWorker.ready.then(registration => {
                    registration.active.postMessage({type: "LAST_MODIFIED", payload: isHaxDataUpdated})
                })
            }
    })
}
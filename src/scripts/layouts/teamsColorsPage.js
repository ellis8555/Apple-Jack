import clearTablesDiv from "../tables/clearTablesDiv";
import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv";
import getTablesDiv from "../tables/getTablesDiv";
import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";
import setTeamsPageLayout from "../layouts/setTeamsPageLayout";
import teamsColorMAP from "../var_lib/maps/teams/teamsColorMAP";
import getTeams3dColorScheme from "../misc/getTeams3DColorScheme";

export default function teamColorsPage(e) {
    clearTablesDiv();
    clearScoreboardDiv();
    getTablesDiv();
    let team = e.target.dataset.teamName;
    let seasonNum = e.target.dataset.seasonNum;
    let homeColorScheme = eachTeamObjectMAP.get(team)[`S0${seasonNum}Home`];
    let awayColorScheme = eachTeamObjectMAP.get(team)[`S0${seasonNum}Away`];
    let teamLogosLayout;

    const teamLogosHcSize = '1rem, 2.5rem, 2.75rem'
    let homeColorString = `S0${seasonNum}Home`
    let teamsColorScheme = eachTeamObjectMAP.get(team)[homeColorString]
    let colorParts = teamsColorScheme.split(" ")
    let mainColor = colorParts[2];
        let awayColorString = `S0${seasonNum}Away`
        let teamsAwayColorScheme = eachTeamObjectMAP.get(team)[awayColorString]
        let awayColorParts = teamsAwayColorScheme.split(" ")
        let awayColor = awayColorParts[2];
    let tLL = teamLogosLayout;
    // teamsColorsLayout is grid containing class
    tLL = `<div class="w3-container w3-margin teamColorsLayout">`;
    //  back button
    tLL += `<button id="teamColorsBackButton" class="w3-btn w3-round-large colorsBackButton" style="background-color:#${
      eachTeamObjectMAP.get(team).MainColor
    }; color: #ffffff;" data-team-name="${team}" data-season-num="${seasonNum}">back</button>`;
    // teamColorsLayout class that contains the title in colors layout
    tLL += `<div class="teamColorsHeader w3-blue w3-round-large">`;
    tLL += `<h4 class="w3-text-black">Copy teams color to clipboard</h4>`;
    tLL += `</div>`;
    // teamColorsLayout body of layout containing team logos
    // begin flex items containing team logo cards
    // opening teamColorsHomeContent
    tLL += `<div class="teamColorsHomeContent w3-container w3-padding w3-blue w3-round-large" style="height: 16rem !important">`;
    tLL += `<div class="w3-card-4 w3-padding w3-yellow w3-round-large">`;
    tLL += `<div><h5>Home</h5></div>`;
    tLL += `<div
        data-team-name="${team}" 
        data-season-num="${seasonNum}"
        class="navLogo three-d-Logo"
        style="width: 55%; height: 55%; margin:auto; display: grid; place-items: center;background-color: #${teamsColorMAP.get(
          team
        )};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(mainColor, colorParts)};
    transform: rotate(${colorParts[0]}deg);"
    >
    <div style="color: #${colorParts[1]};font-weight: 200;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${colorParts[0]}deg);">HC</div>
    </div>`;
    // container holding red blue buttons
    tLL += `<div class="w3-container w3-padding redBlue">`;
    // red button container
    tLL += `<div data-color-scheme="${
      "/colors red" + " " + homeColorScheme
    }" class="w3-padding w3-round w3-center w3-red red">`;
    tLL += `left`;
    // closing red button container
    tLL += `</div>`;
    // blue button container
    tLL += `<div data-color-scheme="${
      "/colors blue" + " " + homeColorScheme
    }" class="w3-padding w3-round w3-center w3-blue blue">`;
    tLL += `right`;
    // closing blue button container
    tLL += `</div>`;
    // closing red blue container
    tLL += `</div>`;
    // closing card containing logo
    tLL += `</div>`;
    //closing teamColorsHomeContent
    tLL += `</div>`;
    // opening teamColorsAwayContent
    tLL += `<div class="teamColorsAwayContent w3-container w3-padding w3-blue w3-round-large" style="height: 16rem !important">`;
    tLL += `<div class="w3-card-4 w3-padding w3-yellow w3-round-large">`;
    tLL += `<div><h5>Alternate</h5></div>`;
    tLL += `<div
        data-team-name="${team}" 
        data-season-num="${seasonNum}"
        class="navLogo three-d-Logo"
        style="width: 55%; height: 55%; margin:auto; display: grid; place-items: center;background-color: #${awayColor};
        background: radial-gradient(circle at 50% 00%, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(0, 0, 0, 0.2) 40%, 
    rgba(0, 0, 0, 0.2) 100%),
    ${getTeams3dColorScheme(awayColor, awayColorParts)};
    transform: rotate(${awayColorParts[0]}deg);"
    >
    <div style="color: #${awayColorParts[1]};font-weight: 200;font-size: clamp(${teamLogosHcSize}); transform: rotate(-${awayColorParts[0]}deg);">HC</div>
    </div>`;
    // container holding red blue buttons
    tLL += `<div class="w3-container w3-padding redBlue">`;
    // red button container
    tLL += `<div data-color-scheme="${
      "/colors red" + " " + awayColorScheme
    }" class="w3-padding w3-round w3-center w3-red red">`;
    tLL += `left`;
    // closing red button container
    tLL += `</div>`;
    // blue button container
    tLL += `<div data-color-scheme="${
      "/colors blue" + " " + awayColorScheme
    }" class="w3-padding w3-round w3-center w3-blue blue">`;
    tLL += `right`;
    // closing blue button container
    tLL += `</div>`;
    // closing red blue container
    tLL += `</div>`;
    // closing card containing logo
    tLL += `</div>`;
    //closing teamColorsAwayContent
    tLL += `</div>`;
    //closing teamColorsLayout
    tLL += `</div>`;
  
    tablesDiv.innerHTML += `${tLL}`;
  
    // create function to copy color red/blue scheme
  
    document
      .getElementById("teamColorsBackButton")
      .addEventListener("click", () => {setTeamsPageLayout(document.getElementById('teamColorsBackButton'))});
    // end back button
  
    function getColorScheme(e) {
      let scheme = e.target.dataset.colorScheme;
      navigator.clipboard.writeText(scheme);
    }
  
    // set listeners on newly created red/blue button elements
    let redBlueButtons = document.querySelectorAll("div[data-color-scheme]");
    redBlueButtons.forEach((item) =>
      item.addEventListener("click", getColorScheme)
    );
  }
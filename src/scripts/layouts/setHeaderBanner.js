import { DEFENDING_CHAMPS } from "../../constants/consts/vars";
import setTeamLogoCss from "./navbar/helpers/setTeamLogoCss";
import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";
import { HC_FONT, SEASON_WITH_TEAM_LOGOS_START } from "../../constants/consts/vars";

export default function setHeaderBanner(teamName, seasonNumber) {
  const previousBannerIcon = document.getElementById("headerIcon");
  if(previousBannerIcon){
    previousBannerIcon.remove()
  }

  // set banners background color to alpah black except for teams who's primary color is black
  const getTeamsColor = eachTeamObjectMAP.get(teamName).MainColor
  let teamsColor
  if(getTeamsColor !== "000000"){
    teamsColor = "0,0,0,.6"
  } else {
    teamsColor = "255,255,255,.2"
  }
  // note this is not the champions banner
  let header = document.getElementById("headerTeamName");
  header.style.backgroundColor = `rgba(${teamsColor})`
  const insertionDiv = document.createElement("div");
  insertionDiv.style.display = "flex";
  insertionDiv.style.justifyContent = "center"
  insertionDiv.style.alignItems = "center"
  insertionDiv.id = "headerIcon"

  const seasonNumberAsNumber = parseInt(seasonNumber)
  // checks for seasons when teams did not have custom team logos and only css logos
    if(seasonNumberAsNumber < SEASON_WITH_TEAM_LOGOS_START){
      // get teams css logo
      const teamsCssLogo = setTeamLogoCss(insertionDiv, seasonNumber, undefined, teamName);
      const grabLogo = teamsCssLogo.firstElementChild.firstElementChild
      grabLogo.style.height = "6rem";
      grabLogo.style.width = "6rem";
      insertionDiv.append(teamsCssLogo)
      const cssLogoNode = teamsCssLogo.firstElementChild;
      cssLogoNode.style.height = "6rem";
      cssLogoNode.style.width = "8rem";
      const cssLogoTextNode = cssLogoNode.firstElementChild.firstElementChild
      cssLogoTextNode.style.fontSize = `clamp(${HC_FONT.setHeaderBanner})`;
      header.prepend(insertionDiv)
    } else {
      // seasons where teams now have ai generated team logos
      const seasonNumberFolderName = seasonNumberAsNumber>9 ? `S${seasonNumber}` : `S0${seasonNumber}`
      const teamsLogoName = eachTeamObjectMAP.get(teamName)[`${seasonNumberFolderName}HomeFilePath`]
      const teamLogo = `../../img/teamLogos/${seasonNumberFolderName}/${teamsLogoName}.png`

      const imgElement = document.createElement('img')
      imgElement.src = teamLogo
      imgElement.alt = teamName
      imgElement.style.height = "9rem"
      imgElement.style.objectFit = "contain"
      imgElement.style.display = "block"

      insertionDiv.append(imgElement)
      
      // get teams css logo
      header.prepend(insertionDiv)
    }
    // append the teams name below logo
    const headerChildren = header.childNodes;
    headerChildren[headerChildren.length-1].textContent = teamName;
    // add champions name here to display trophy icon when champion team selected
    let trophyDiv = document.getElementById("trophyDiv");
    if (teamName == DEFENDING_CHAMPS) {
      const iElement = document.querySelector("i")
      if(!iElement){
        const addIElement=  document.createElement("i")
        addIElement.classList.add("fa", "fa-trophy", "trophy")
        trophyDiv.append(addIElement)
      } else {
        iElement.classList.add("fa", "fa-trophy", "trophy")
      }
    } else {
      const isIElement = document.querySelector("i")
      if(isIElement){
        isIElement.remove()
      }
    }
}
import { DEFENDING_CHAMPS } from "../../constants/consts/vars";
import setTeamLogoCss from "./navbar/helpers/setTeamLogoCss";
import { HC_FONT } from "../../constants/consts/vars";

export default function setHeaderBanner(teamName, seasonNumber) {
  const previousBannerIcon = document.getElementById("headerIcon");
  if(previousBannerIcon){
    previousBannerIcon.remove()
  }
  // note this is not the champions banner
  let header = document.getElementById("headerTeamName");
  const insertionDiv = document.createElement("div");
  insertionDiv.style.display = "flex";
  insertionDiv.style.justifyContent = "center"
  insertionDiv.style.alignItems = "center"
  insertionDiv.id = "headerIcon"

  const seasonNumberAsNumber = parseInt(seasonNumber)
  // checks for seasons when teams did not have custom team logos and only css logos
    if(seasonNumberAsNumber < 5){
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
      const teamLogo = `../../img/teamLogos/${seasonNumberFolderName}/${teamName}.png`

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
    let trophy = document.querySelector("i");
    if (teamName == DEFENDING_CHAMPS) {
      trophy.classList.add("fa-trophy");
    } else {
      trophy.classList.remove("fa-trophy");
    }
}
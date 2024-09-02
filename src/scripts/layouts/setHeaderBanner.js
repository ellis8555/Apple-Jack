import { DEFENDING_CHAMPS } from "../../constants/consts/vars";
import setTeamLogoCss from "./navbar/helpers/setTeamLogoCss";
import { HC_FONT } from "../../constants/consts/vars";

export default function setHeaderBanner(teamName, seasonNumber) {
  const previousBannerIcon = document.getElementById("headerIcon");
  if(previousBannerIcon){
    previousBannerIcon.innerHTML = "";
  }
    // note this is not the champions banner
  let header = document.getElementById("headerTeamName");
const insertionDiv = document.createElement("div");
insertionDiv.style.display = "flex";
insertionDiv.style.justifyContent = "center"
insertionDiv.style.alignItems = "center"
insertionDiv.id = "headerIcon"

// get teams css logo
const teamsCssLogo = setTeamLogoCss(insertionDiv, seasonNumber, undefined, teamName);
const grabLogo = teamsCssLogo.firstElementChild.firstElementChild
grabLogo.style.height = "6rem";
grabLogo.style.width = "6rem";
insertionDiv.append(teamsCssLogo)
const cssLogoNode = teamsCssLogo.firstElementChild;
cssLogoNode.style.height = "6rem";
cssLogoNode.style.width = "6rem";
const cssLogoTextNode = cssLogoNode.firstElementChild.firstElementChild
cssLogoTextNode.style.fontSize = HC_FONT.setHeaderBanner;
header.prepend(insertionDiv)
    let headerChildren = header.childNodes;
    headerChildren[headerChildren.length-1].textContent = teamName;
    // add champions name here to display trophy icon when champion team selected
    let trophy = document.querySelector("i");
    if (teamName == DEFENDING_CHAMPS) {
      trophy.classList.add("fa-trophy");
    } else {
      trophy.classList.remove("fa-trophy");
    }
  }
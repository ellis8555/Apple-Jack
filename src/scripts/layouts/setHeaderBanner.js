import { DEFENDING_CHAMPS } from "../../constants/consts/vars";
import setTeamLogoCss from "./navbar/helpers/setTeamLogoCss";

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
insertionDiv.id = "headerIcon"
const teamsIconHtmlString = setTeamLogoCss(insertionDiv, seasonNumber, undefined, teamName);
insertionDiv.innerHTML = teamsIconHtmlString
const xChild = insertionDiv.firstChild;
insertionDiv.removeChild(xChild)
const cssLogoNode = insertionDiv.firstElementChild.firstElementChild.firstElementChild;
cssLogoNode.style.height = "6rem";
cssLogoNode.style.width = "6rem";
const cssLogoTextNode = cssLogoNode.firstElementChild;
cssLogoTextNode.style.fontSize = "clamp(1rem, 2rem, 3rem)"
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
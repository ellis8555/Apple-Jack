import { DEFENDING_CHAMPS } from "../../constants/consts/vars";

export default function setHeaderBanner(imgSource, teamName) {
    // note this is not the champions banner
    let headerImage = document.querySelector("#championsCard>div>img");
    headerImage.src = imgSource;
    let header = document.getElementById("headerTeamName");
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
import setTeamsPageLayout from "../../layouts/setTeamsPageLayout";

export default function setListenersMainNavbar() {
    let getTeamsFromNavBar = document.querySelectorAll("img[data-team-name]");
    getTeamsFromNavBar.forEach((item) =>
      // item.addEventListener("click", getTeamsGameResults)
      item.addEventListener("click", setTeamsPageLayout)
    );
  }
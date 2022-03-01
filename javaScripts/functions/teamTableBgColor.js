import { eachTeamObjectMAP } from "../../json/masterVars.js";

export default function setTeamsTableBgColor() {
  let teamRow = document.querySelectorAll("td[data-field-name='Team']");
  teamRow.forEach((item) => {
    item.style.backgroundColor = `#${
      eachTeamObjectMAP.get(item.textContent).MainColor
    }`;
    item.style.color = "white";
  });
}

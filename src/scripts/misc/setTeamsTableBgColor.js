import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";

export default function setTeamsTableBgColor() {
  let teamRow = document.querySelectorAll("td[data-field-name='Team']");
  teamRow.forEach((item) => {
    item.style.backgroundColor = `#${
      eachTeamObjectMAP.get(item.textContent).MainColor
    }`;
    item.style.color = "white";
  });
}
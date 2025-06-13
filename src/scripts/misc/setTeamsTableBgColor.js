import eachTeamObjectMAP from "../var_lib/maps/teams/eachTeamObjectMAP";

export default function setTeamsTableBgColor() {
  const teamColumn = document.querySelectorAll("td[data-field-name='Team']");
  teamColumn.forEach((item) => {
    item.style.backgroundColor = `#${
      eachTeamObjectMAP.get(item.textContent).MainColor
    }`;
    item.style.color = "white";
  });
}
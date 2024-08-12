import hidePlayerSubMenu from "./players/hidePlayerSubMenu";
import hideTeamSubMenu from "./teams/hideTeamSubMenu"

export default function hideAllSubMenus() {
    hideTeamSubMenu();
    hidePlayerSubMenu();
  }
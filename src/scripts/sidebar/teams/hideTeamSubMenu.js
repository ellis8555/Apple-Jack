const teamsTables = document.querySelectorAll(".teamTable");

export default function hideTeamSubMenu() {
    teamsTables.forEach((item) => item.classList.add("w3-hide"));
  }
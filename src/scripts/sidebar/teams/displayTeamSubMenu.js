const teamsTables = document.querySelectorAll(".teamTable");

export default function displayTeamSubMenu() {
  teamsTables.forEach((item) => {
    item.classList.toggle("w3-hide");
    item.classList.toggle("w3-yellow", !item.classList.contains("w3-hide"));
  });
}
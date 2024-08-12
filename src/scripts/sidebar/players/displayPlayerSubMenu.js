const playersTables = document.querySelectorAll(".playerTable");

export default function displayPlayerSubMenu() {
  playersTables.forEach((item) => {
    item.classList.toggle("w3-hide");
    item.classList.toggle("w3-yellow", !item.classList.contains("w3-hide"));
  });
}
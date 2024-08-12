const playersTables = document.querySelectorAll(".playerTable");

export default function hidePlayerSubMenu() {
    playersTables.forEach((item) => item.classList.add("w3-hide"));
  }
export default function mainNavbarLayout(teamCount, containingElement) {
  const screenWidth = window.innerWidth;
  if (screenWidth < 500 && teamCount > 5) {
    containingElement.style.flexWrap = "wrap";
  } else {
    containingElement.style.flexWrap = "";
  }
}

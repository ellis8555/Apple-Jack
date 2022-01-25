export function openSidebar() {
  document.getElementById("sidebar").style.display = "block";
}

export function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}

// this code for sidebar "other stats" link

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

let slideIndex = 1;

export function displaySlides() {
  let displayArea = document.getElementById("tablesDiv");

  displayArea.innerHTML = `<div class="w3-content w3-display-container w3-margin-top w3-card-4">
<div class="w3-display-container mySlides">
  <img
    class="w3-image"
    src="img/S01_Stats/S01_Season_Results.jpg"
    alt="Season game results"
    style="width: 100%"
  />
  <div
    class="
      w3-display-bottommiddle
      w3-large
      w3-panel
      w3-padding-16
      w3-black
      w3-opacity-max
    "
  >
    S01 game results
  </div>
</div>

<div class="w3-display-container mySlides">
  <img
    class="w3-image"
    src="img/S01_Stats/S01_Playoff_Bracket.jpg"
    alt="Playoff bracket"
    style="width: 100%"
  />
  <div
    class="
      w3-display-bottommiddle
      w3-large
      w3-container
      w3-padding-16
      w3-black
      w3-opacity-max
    "
  >
    S01 Playoff bracket
  </div>
</div>

<button
  class="w3-button w3-black w3-display-left w3-opacity"
  onclick="plusDivs(-1)"
>
  &#10094;
</button>
<button
  class="w3-button w3-black w3-display-right w3-opacity"
  onclick="plusDivs(1)"
>
  &#10095;
</button>
</div>
<!--end of slides-->`;

  showDivs(slideIndex);
}

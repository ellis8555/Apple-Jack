function openSidebar() {
  document.getElementById("sidebar").style.display = "block";
}

function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}

// 1. displayTeamNavbar
// 2. display displaySlides

// this code for teams navbar container

let displayTeamNavbar = function () {
  let displayArea = document.getElementById("teamsNavbar");

  let logoHeight,
    logoWidth = "70%";

  displayArea.innerHTML = `<section
  class="w3-display w3-center w3-yellow w3-round-xlarge"
  style="display: flex; justify-content: center; overflow: hidden"
>
  <div class="w3-container w3-cell w3-cell-middle">
    <div
      class="
        w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section
      "
      style="height: logoHeight; width: logoWidth;"
    >
      <a href="#"
        ><img
          src="img/teamLogos/haxHomeS01.svg"
          alt=".Hax HC"
          class="w3-image"
        />
      </a>
     
    </div>
  </div>
  <div class="w3-container w3-cell w3-cell-middle">
    <div
      class="
        w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section
      "
      style="height: logoHeight; width:  logoWidth;"
    >
      <a href="#"
        ><img
          src="img/teamLogos/cegHomeS02.svg"
          alt="CEG United"
          class="w3-image"
        />
      </a>
     
    </div>
  </div>
  <div class="w3-container w3-cell w3-cell-middle">
    <div
      class="
        w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section
      "
      style="height: logoHeight; width:  logoWidth;"
    >
      <a href="#"
        ><img
          src="img/teamLogos/haxualChocolateHomeS01.svg"
          alt="Haxual Chocolate HC"
          class="w3-image"
        />
      </a>
     
    </div>
  </div>
  <div class="w3-container w3-cell w3-cell-middle">
    <div
      class="
        w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section
      "
      style="height: logoHeight; width:  logoWidth;"
    >
      <a href="#"
        ><img
          src="img/teamLogos//MooneyHomeS01.svg"
          alt="Mooney HC"
          class="w3-image"
        />
      </a>
     
    </div>
  </div>
  <div class="w3-container w3-cell w3-cell-middle">
    <div
      class="
        w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section
      "
      style="height: logoHeight; width:  logoWidth;"
    >
      <a href="#"
        ><img
          src="img/teamLogos/sadHomeS01.svg"
          alt="SAD HC"
          class="w3-image"
        />
      </a>
     
    </div>
  </div>
</section>`;
};

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

let displaySlides = function () {
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
};

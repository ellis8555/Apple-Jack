function displayTeamNavbar() {
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
}

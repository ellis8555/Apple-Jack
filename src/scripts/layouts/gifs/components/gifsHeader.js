import backButton from "../../../misc/backButton";
import createTeamCssLogo from "../../../misc/createTeamCssLogo";

function gifsHeader({teamName, thisGifsSeasonNum,  thisGamesHomeTeam, thisGamesAwayTeam ,thisGamesHomeTeamScore, thisGamesAwayTeamScore, gameType}){
    const gifsHeaderContainer = document.createElement("div");
    gifsHeaderContainer.classList.add("gifsHeaderContainer");

    // Back button
    const backButtonElement = backButton(
      "gamesGifsBackButton",
      teamName,
      thisGifsSeasonNum,
      gameType,
      "gifsBackButton"
    );
    gifsHeaderContainer.appendChild(backButtonElement);

    // Home team section
    const gifsHomeTeam = document.createElement("div");
    gifsHomeTeam.classList.add("gifsHomeTeam");
    gifsHomeTeam.innerHTML = createTeamCssLogo.setGifs(
      thisGamesHomeTeam,
      thisGifsSeasonNum,
      "Home"
    );
    gifsHeaderContainer.appendChild(gifsHomeTeam);

    const gifsHomeTeamScore = document.createElement("div");
    gifsHomeTeamScore.classList.add("gifsHomeTeamScore");
    gifsHomeTeamScore.textContent = thisGamesHomeTeamScore;
    gifsHeaderContainer.appendChild(gifsHomeTeamScore);

    // "vs" section
    const gifsVsHeader = document.createElement("div");
    gifsVsHeader.classList.add("gifsVsHeader");
    gifsVsHeader.textContent = " vs ";
    gifsHeaderContainer.appendChild(gifsVsHeader);

    // Away team section
    const gifsAwayTeam = document.createElement("div");
    gifsAwayTeam.classList.add("gifsAwayTeam");
    gifsAwayTeam.innerHTML = createTeamCssLogo.setGifs(
      thisGamesAwayTeam,
      thisGifsSeasonNum,
      "Away"
    );
    gifsHeaderContainer.appendChild(gifsAwayTeam);

    const gifsAwayTeamScore = document.createElement("div");
    gifsAwayTeamScore.classList.add("gifsAwayTeamScore");
    gifsAwayTeamScore.textContent = thisGamesAwayTeamScore;
    gifsHeaderContainer.appendChild(gifsAwayTeamScore);

    return gifsHeaderContainer;
}

export default gifsHeader;
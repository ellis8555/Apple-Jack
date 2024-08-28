import backButton from "../../misc/backButton";
import colorPageHeader from "./colorPageHeader/colorPageHeader";
import TeamsLogoElement from "./TeamsLogoElement/TeamsLogoElement";

function ColorsPageLayout(teamName, seasonNumber, homeColorScheme, awayColorScheme){
    const containerElem = document.createElement("div");
    containerElem.classList.add("w3-container", "w3-margin", "teamColorsLayout")

    containerElem.append(backButton('teamColorsBackButton', teamName, seasonNumber, "Season", "colorsBackButton"))
    containerElem.append(colorPageHeader())
    containerElem.append(TeamsLogoElement(teamName, seasonNumber, "Home", "Home", homeColorScheme))
    containerElem.append(TeamsLogoElement(teamName, seasonNumber, "Away", "Alternate", awayColorScheme))

    return containerElem;
}

export default ColorsPageLayout;
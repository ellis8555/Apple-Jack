import createCssLogoSkeleton from "./createCssLogoSkeleton";
import { HC_FONT, CSS_LOGO_DIMENSIONS } from "../../constants/consts/vars";

const createTeamCssLogo = {
    // setTeamLogoCss page
    "setTeamLogoCss": function(teamName, seasonNumber, homeOrAway){
        const attributes = {
            "width": CSS_LOGO_DIMENSIONS.setTeamLogoCss.width,
            "height": CSS_LOGO_DIMENSIONS.setTeamLogoCss.height,
            "fontSize": HC_FONT.setTeamLogoCss,
            teamName,
            seasonNumber,
            homeOrAway
        }
        return createCssLogoSkeleton(attributes)
    },
    // games results page
    "getTeamsGamesResults": function(teamName, seasonNumber, homeOrAway){
        const attributes = {
            "width": CSS_LOGO_DIMENSIONS.getTeamsGamesResults.width,
            "height": CSS_LOGO_DIMENSIONS.getTeamsGamesResults.height,
            "fontSize": HC_FONT.getTeamsGamesResults,
            teamName,
            seasonNumber,
            homeOrAway
        }
        return createCssLogoSkeleton(attributes)
    },
    // gifs page
    "setGifs": function(teamName, seasonNumber, homeOrAway){
        const attributes = {
            "width": CSS_LOGO_DIMENSIONS.setGifs.width,
            "height": CSS_LOGO_DIMENSIONS.setGifs.height,
            "fontSize": HC_FONT.setGifs,
            teamName,
            seasonNumber,
            homeOrAway
        }
        return createCssLogoSkeleton(attributes)
    },
    // boxscore for a single game page
    "singleGameStats": function(teamName, seasonNumber, homeOrAway){
        const attributes = {
            "width": CSS_LOGO_DIMENSIONS.singleGameStats.width,
            "height": CSS_LOGO_DIMENSIONS.singleGameStats.height,
            "fontSize": HC_FONT.singleGameStats,
            teamName,
            seasonNumber,
            homeOrAway
        }
        return createCssLogoSkeleton(attributes)
    },
    // teams color page
    "teamsColorsPage": function(teamName, seasonNumber, homeOrAway){
        const attributes = {
            "width": CSS_LOGO_DIMENSIONS.teamColors.width,
            "height": CSS_LOGO_DIMENSIONS.teamColors.height,
            "fontSize": HC_FONT.teamColors,
            teamName,
            seasonNumber,
            homeOrAway
        }
        return createCssLogoSkeleton(attributes)
    },
}

export default createTeamCssLogo;
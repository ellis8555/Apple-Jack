import { gameResults } from "../../../../json/masterVars.js";

export default function filterGameResults(seasonMode) {
  let filteredGameResults;

  switch (seasonMode) {
    case "Season":
      filteredGameResults = gameResults.filter((games) => {
        return games.GameTypeID == "1";
      });
      break;
    case "Playoff":
      filteredGameResults = gameResults.filter((games) => {
        return games.GameTypeID == "2";
      });
      break;
    default:
      filteredGameResults = gameResults;
  }

  return filteredGameResults;
}

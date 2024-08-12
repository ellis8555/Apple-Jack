import { GameResults } from "../../../../constants/masterHaxData";

export default function filterGameResults(seasonMode) {
  let filteredGameResults;

  switch (seasonMode) {
    case "Season":
      filteredGameResults = GameResults.filter((games) => {
        return games.GameTypeID == "1";
      });
      break;
    case "Playoff":
      filteredGameResults = GameResults.filter((games) => {
        return games.GameTypeID == "2";
      });
      break;
    default:
      filteredGameResults = GameResults;
  }

  return filteredGameResults;
}

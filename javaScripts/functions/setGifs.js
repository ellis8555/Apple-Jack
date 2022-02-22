import { gifs } from "../../json/masterVars.js";
import { clearScoreboardDiv, clearTablesDiv } from "./variousFunctions.js";

export function setGifs(gameID) {
  gameID.filter((item) => (item.gameID = gameID));
  clearScoreboardDiv();
  clearTablesDiv();
}

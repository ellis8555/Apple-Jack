import getTeamsPlayers from "../genericRecordFunctions/getTeamsPlayers.js";
import { playersMAP } from "../../../../json/masterVars.js";
import getTeamsBackgroundColor from "../genericRecordFunctions/getTeamsBackgroundColor.js";

export default function createIndividualRecord(
  teamLogo,
  recordName,
  recordStat,
  seasonNumber,
  team
) {
  // create containing div for this record. will contain 2 rows. first row is the title and second will be the data
  let recordDivContainer = document.createElement("div");
  const teamsColor = getTeamsBackgroundColor(team);
  recordDivContainer.style.backgroundColor = `#${teamsColor}`;
  recordDivContainer.classList = "singleRecordContainer w3-panel w3-round";

  // create teamLogo div
  let logoDiv = document.createElement("div");
  logoDiv.classList = "teamsLogo w3-panel w3-round w3-card";
  // create img element to display team logo
  let imageElement = document.createElement("img");
  imageElement.src = teamLogo;
  logoDiv.append(imageElement);
  recordDivContainer.append(logoDiv);

  //create div that will hold the records data (number)
  let teamRecordStat = document.createElement("div");
  teamRecordStat.classList = "teamRecordStat w3-panel w3-round w3-card";
  teamRecordStat.innerHTML = `${recordName}: ${recordStat}`;
  recordDivContainer.append(teamRecordStat);

  // create div that displays the season the record occured in
  let seasonNum = document.createElement("div");
  seasonNum.classList = "recordSeasonNumber w3-panel w3-round w3-card";
  seasonNum.innerHTML = `Season: ${seasonNumber}`;
  recordDivContainer.append(seasonNum);

  // get players from the record setting team
  const thisTeamsPlayers = getTeamsPlayers(team, seasonNumber);
  console.log(thisTeamsPlayers);
  // create div which will display the players from that record setting team
  let recordPlayers = document.createElement("div");
  recordPlayers.classList = "recordPlayers w3-panel w3-round w3-card";
  thisTeamsPlayers.forEach((player) => {
    // get players name
    const playerName = playersMAP.get(+player.PlayerID);
    // create p element that will hold the players name
    const p = document.createElement("p");
    p.innerHTML = playerName;
    recordPlayers.append(p);
  });
  recordDivContainer.append(recordPlayers);
  return recordDivContainer;
}

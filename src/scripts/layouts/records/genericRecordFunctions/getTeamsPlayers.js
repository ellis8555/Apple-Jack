import { TeamPlayers } from "../../../../constants/masterHaxData";

export default function getTeamsPlayers(teamNumber, seasonNumber) {
  // filter out to the correct season
  const getSeasonNumbersGames = TeamPlayers.filter((games) => {
    return games.SeasonNumber == seasonNumber;
  });
  // filter out the team from the correct season
  const getPlayers = getSeasonNumbersGames.filter((players) => {
    return players.TeamID == teamNumber.toString();
  });
  return getPlayers;
}

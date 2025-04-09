const fetchHaxData = await fetch("https://hax94-league.s3.us-east-2.amazonaws.com/json/haxData.json")
const haxBallData = await fetchHaxData.json();

export const { Teams, Players, GameType, TeamPlayers, GameResults, GamePlayerStats, Gifs } = haxBallData
import { Teams, Players, GameType, TeamPlayers, GameResults, GamePlayerStats } from "../masterHaxData";

export const DEFENDING_CHAMPS = "Haxual Chocolate";
export const DEFENDING_CHAMPS_LOGO = "img/teamLogos/S03/haxualChocolateHomeS03.svg"
export const SEASONS_WITH_TIE_GAMES = [1];
// count of how many teams there are
export const TEAMS_LENGTH = Teams.length;
// array of length matching teams_length which gets populated
export const TEAM_NAMES_ARRAY = [TEAMS_LENGTH]
// count of how many players there are
export const PLAYERS_LENGTH = Players.length;
// 2 count modes of season/playoff
export const GAME_TYPE_LENGTH = GameType.length;
// length of list of each player to which team for each season
export const TEAM_PLAYERS_LENGTH = TeamPlayers.length;
// count of how many games played both playoff and season
export const GAME_RESULTS_LENGTH = GameResults.length;
// length of every players stat recorded for all games
export const GAME_PLAYER_STATS_LENGTH = GamePlayerStats.length;

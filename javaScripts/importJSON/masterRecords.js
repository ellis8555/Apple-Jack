// const haxBallData = JSON.parse(``)

let getData = await fetch("../json/haxData.json");
export let haxBallData = await getData.json();

// export const hhaxBallData = JSON.parse(`{
//     "GameResults": [
//         {
//             "GameID": "1",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "7",
//             "TeamTwo": "2",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "7",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "2",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "1",
//             "TeamTwo": "2",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "2",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "3",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "2",
//             "TeamTwo": "3",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "4",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "4",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "1",
//             "TeamTwo": "3",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "11",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "5",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "1",
//             "TeamTwo": "4",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "8",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "6",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "1",
//             "TeamTwo": "4",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "3",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "7",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "5",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "3",
//             "TeamTwo": "1",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "2",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "8",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "1",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "3",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "1",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "9",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "2",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "2",
//             "TeamTwo": "3",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "6",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "10",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "2",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "2",
//             "TeamTwo": "3",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "4",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "11",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "2",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "1",
//             "TeamTwo": "4",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "5",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "12",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "2",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "3",
//             "TeamTwo": "4",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "10",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "13",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "2",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "7",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "4",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "14",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "2",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "4",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "2",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "15",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "6",
//             "TeamTwo": "3",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "2",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "16",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "3",
//             "TeamTwo": "3",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "1",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "17",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "10",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "3",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "18",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "8",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "3",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "19",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "3",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "2",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "0",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "20",
//             "SeasonNumber": "1",
//             "GameTypeID": "1",
//             "Round": "0",
//             "TeamOne": "3",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "6",
//             "TeamTwo": "5",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "0",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "21",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "1",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "6",
//             "TeamTwo": "1",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "4",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "22",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "1",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "1",
//             "TeamTwo": "1",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "2",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "23",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "1",
//             "TeamOne": "4",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "3",
//             "TeamTwo": "1",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "4",
//             "ExtraTime": "Yes"
//         },
//         {
//             "GameID": "24",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "1",
//             "TeamOne": "3",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "4",
//             "TeamTwo": "2",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "3",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "25",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "1",
//             "TeamOne": "3",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "7",
//             "TeamTwo": "2",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "4",
//             "ExtraTime": "Yes"
//         },
//         {
//             "GameID": "26",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "2",
//             "TeamOne": "3",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "9",
//             "TeamTwo": "1",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "5",
//             "ExtraTime": "No"
//         },
//         {
//             "GameID": "27",
//             "SeasonNumber": "1",
//             "GameTypeID": "2",
//             "Round": "2",
//             "TeamOne": "3",
//             "TeamOnePossession": "0",
//             "TeamOneScore": "7",
//             "TeamTwo": "1",
//             "TeamTwoPossession": "0",
//             "TeamTwoScore": "5",
//             "ExtraTime": "No"
//         }
//     ],
//     "GamePlayerStats": [
//         {
//             "GameID": "1",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "1",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "1",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "1",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "1",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "1",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "2",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "2",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "2",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "2",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "2",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "2",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "3",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "3",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "3",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "3",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "3",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "3",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "4",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "5",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "4",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "4",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "5",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "4",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "4",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "4",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "5",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "5",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "5",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "5",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "5",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "5",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "6",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "6",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "6",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "6",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "6",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "6",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "7",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "7",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "7",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "7",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "7",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "7",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "8",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "8",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "8",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "8",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "8",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "8",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "9",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "9",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "9",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "9",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "9",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "9",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "10",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "10",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "10",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "10",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "10",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "10",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "11",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "11",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "11",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "11",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "11",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "11",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "12",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "12",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "12",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "5",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "12",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "12",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "12",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "13",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "13",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "13",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "13",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "13",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "5",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "13",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "14",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "14",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "14",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "14",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "14",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "14",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "15",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "15",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "15",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "15",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "15",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "15",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "4",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "16",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "16",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "16",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "16",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "16",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "16",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "17",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "17",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "17",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "17",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "17",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "17",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "4",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "18",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "18",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "18",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "18",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "18",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "18",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "19",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "19",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "19",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "19",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "19",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "19",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "20",
//             "TeamID": "5",
//             "PlayerID": "1",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "20",
//             "TeamID": "5",
//             "PlayerID": "5",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "20",
//             "TeamID": "5",
//             "PlayerID": "13",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "20",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "20",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "20",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "21",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "21",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "1",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "21",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "21",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "21",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "21",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "22",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "22",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "22",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "22",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "22",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "22",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "23",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "23",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "23",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "23",
//             "TeamID": "4",
//             "PlayerID": "2",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "23",
//             "TeamID": "4",
//             "PlayerID": "11",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "23",
//             "TeamID": "4",
//             "PlayerID": "14",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "24",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "24",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "24",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "24",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "24",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "24",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "2",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "25",
//             "TeamID": "2",
//             "PlayerID": "3",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "25",
//             "TeamID": "2",
//             "PlayerID": "6",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "25",
//             "TeamID": "2",
//             "PlayerID": "7",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "25",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "3",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "25",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "25",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "4",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "26",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "26",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "26",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "26",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "5",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "26",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "26",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "4",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "27",
//             "TeamID": "1",
//             "PlayerID": "9",
//             "Goals": "1",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "27",
//             "TeamID": "1",
//             "PlayerID": "12",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "27",
//             "TeamID": "1",
//             "PlayerID": "15",
//             "Goals": "2",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "27",
//             "TeamID": "3",
//             "PlayerID": "4",
//             "Goals": "3",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "27",
//             "TeamID": "3",
//             "PlayerID": "8",
//             "Goals": "0",
//             "Assists": "1",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         },
//         {
//             "GameID": "27",
//             "TeamID": "3",
//             "PlayerID": "10",
//             "Goals": "4",
//             "Assists": "0",
//             "Kicks": "0",
//             "Passes": "0",
//             "ShotsOnGoal": "0"
//         }
//     ],
//     "Teams": [
//         {
//             "TeamID": "1",
//             "TeamName": ".Hax",
//             "MainColor": "388C38"
//         },
//         {
//             "TeamID": "2",
//             "TeamName": "C.E.G United",
//             "MainColor": "5BD1FC"
//         },
//         {
//             "TeamID": "3",
//             "TeamName": "Haxual Chocolate",
//             "MainColor": "572317"
//         },
//         {
//             "TeamID": "4",
//             "TeamName": "Mooney",
//             "MainColor": "C117FF"
//         },
//         {
//             "TeamID": "5",
//             "TeamName": "S.A.D",
//             "MainColor": "0671D1"
//         }
//     ],
//     "Players": [
//         {
//             "PlayerID": "1",
//             "Players": "Angryjay93"
//         },
//         {
//             "PlayerID": "2",
//             "Players": "Chaos"
//         },
//         {
//             "PlayerID": "3",
//             "Players": "Corbettkb"
//         },
//         {
//             "PlayerID": "4",
//             "Players": "Dangler"
//         },
//         {
//             "PlayerID": "5",
//             "Players": "Decadent"
//         },
//         {
//             "PlayerID": "6",
//             "Players": "Ellis"
//         },
//         {
//             "PlayerID": "7",
//             "Players": "Gambi"
//         },
//         {
//             "PlayerID": "8",
//             "Players": "Heinz57"
//         },
//         {
//             "PlayerID": "9",
//             "Players": "Kidswasted"
//         },
//         {
//             "PlayerID": "10",
//             "Players": "Kingraph"
//         },
//         {
//             "PlayerID": "11",
//             "Players": "Mooney"
//         },
//         {
//             "PlayerID": "12",
//             "Players": "Skills324"
//         },
//         {
//             "PlayerID": "13",
//             "Players": "Tennessee Williams"
//         },
//         {
//             "PlayerID": "14",
//             "Players": "Tickenest"
//         },
//         {
//             "PlayerID": "15",
//             "Players": "thatDrizzle"
//         }
//     ],
//     "TeamPlayers": [
//         {
//             "SeasonNumber": "1",
//             "TeamID": "1",
//             "PlayerID": "9"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "1",
//             "PlayerID": "12"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "1",
//             "PlayerID": "15"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "2",
//             "PlayerID": "3"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "2",
//             "PlayerID": "6"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "2",
//             "PlayerID": "7"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "3",
//             "PlayerID": "4"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "3",
//             "PlayerID": "8"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "3",
//             "PlayerID": "10"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "4",
//             "PlayerID": "2"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "4",
//             "PlayerID": "11"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "4",
//             "PlayerID": "14"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "5",
//             "PlayerID": "1"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "5",
//             "PlayerID": "5"
//         },
//         {
//             "SeasonNumber": "1",
//             "TeamID": "5",
//             "PlayerID": "13"
//         }
//     ],
//     "GameType": [
//         {
//             "GameTypeID": "1",
//             "GameType": "Season"
//         },
//         {
//             "GameTypeID": "2",
//             "GameType": "Playoff"
//         }
//     ]
// }`);

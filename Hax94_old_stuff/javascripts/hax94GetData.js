//season one regular season player stats: setTableS01PlayerStats()
//season one playoff player stats: setTableS01PlayoffPlayerStats()
//season one Home page final standings table: setTableS01FinalStandings()
//season one Stats page full final standings table: setFullTableS01FinalStandings

//*****************S01 Regular season player stats table*******************/
//wrapper function
const setTableS01PlayerStats = () => {
  //inside wrapper function
  //fetch data
  async function getS01PlayerStatsJson() {
    let response = await fetch("./json/s01/s01PlayerStats.json");
    let data = await response.json();
    let { s01RegularSeasonPlayerStats } = data;
    return s01RegularSeasonPlayerStats;
  }
  //response to fetching data
  getS01PlayerStatsJson()
    .then((response) => {
      //begin building table with fetched data
      let getS01PlayerStats = (selectedField) => {
        let playerStats = "";
        let categories = "";
        if (selectedField == undefined) {
          selectedField = "Points";
        }
        playerStats =
          "<table class='w3-table-all w3-centered w3-large w3-card-4 w3-text-black' style='width: 50%'>" +
          "<caption><h1>Player Season Stats</h1></caption>" +
          "<thead><tr>";
        // get column fields from first element in the array of player objects
        fields = Object.keys(response[0]);

        // construct field headers in <th> tags
        let fieldLength = fields.length;
        for (let i = 0; i < fieldLength; i++) {
          playerStats +=
            "<th style='cursor:pointer' class = 'w3-hover-yellow' onclick='customSortS01PlayerStats(this)'>" +
            fields[i] +
            "</th>";
        }

        playerStats += "</tr></thead>";

        //end of field headers and beginning of data for each field

        let participantCount = response.length; // counts all player objects returning all players
        let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
        for (let i = 0; i < participantCount; i++) {
          playerStats += "<tr>";
          for (let j = 0; j < fieldLength; j++) {
            if (fieldsArray[j] == selectedField) {
              playerStats +=
                "<td class='w3-yellow'>" +
                response[i][fieldsArray[j]] +
                "</td>";
            } else {
              playerStats += "<td>" + response[i][fieldsArray[j]] + "</td>";
            }
          }
          playerStats += "</tr>";
        }

        playerStats += "</table>";

        //end of table
        //insert table HTML into selected element
        document.getElementById("tablesDiv").innerHTML = playerStats;
      };

      //go live with this function via running this
      getS01PlayerStats();

      //set sorting function listening in on clicks on <th> elements and set as inline function
      customSortS01PlayerStats = (category) => {
        let elmCategory = category.textContent;
        sortedBy = (a, b) => b[elmCategory] - a[elmCategory];
        response.sort(sortedBy);
        getS01PlayerStats((selectedField = elmCategory));
      };
      //end of sorting function
    }) //enter error (catch) block of promise
    .catch((error) => {
      console.log(error);
    });
};

//***************************Playoff player stats table***************************/
//wrapper function
// const setTableS01PlayoffPlayerStats = () => {
//   //inside wrapper function
//   //fetch data
//   async function getS01PlayoffPlayerStatsJson() {
//     let response = await fetch("./json/s01/s01PlayoffPlayerStats.json");
//     let data = await response.json();
//     let { s01PlayoffPlayerStats } = data;
//     return s01PlayoffPlayerStats;
//   }
//   //response to fetching data
//   getS01PlayoffPlayerStatsJson()
//     .then((response) => {
//       //begin building table with fetched data
//       let getS01PlayoffPlayerStats = (selectedField) => {
//         let playerStats = "";
//         let categories = "";
//         if (selectedField == undefined) {
//           selectedField = "Points";
//         }
//         playerStats =
//           "<table class='w3-table-all w3-centered w3-large w3-card-4 w3-text-black' style='width: 50%'>" +
//           "<caption><h1>Player Playoff Stats</h1></caption>" +
//           "<thead><tr>";
//         // get column fields from first element in the array of player objects
//         fields = Object.keys(response[0]);
//         // construct field headers in <th> tags

//         let fieldLength = fields.length;
//         for (let i = 0; i < fieldLength; i++) {
//           playerStats +=
//             "<th style='cursor:pointer' class='w3-hover-yellow' onclick='customS01PlayerPlayoffStats(this)'>" +
//             fields[i] +
//             "</th>";
//         }
//         playerStats += "</tr></thead>";
//         //end of field headers and beginning of data for each field

//         let participantCount = response.length; // counts all player objects returning all players
//         let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
//         for (let i = 0; i < participantCount; i++) {
//           playerStats += "<tr>";
//           for (let j = 0; j < fieldLength; j++) {
//             if (fieldsArray[j] == selectedField) {
//               playerStats +=
//                 "<td class='w3-yellow'>" +
//                 response[i][fieldsArray[j]] +
//                 "</td>";
//             } else {
//               playerStats += "<td>" + response[i][fieldsArray[j]] + "</td>";
//             }
//           }
//           playerStats += "</tr>";
//         }

//         playerStats += "</table>";
//         //end of table
//         //insert table HTML into selected element
//         document.getElementById("tablesDiv").innerHTML = playerStats;
//       };
//       //go live with this function via running this
//       getS01PlayoffPlayerStats();

//       //set sorting function listening in on clicks on <th> elements and set as inline function
//       customS01PlayerPlayoffStats = (category) => {
//         let elmCategory = category.textContent;
//         sortedBy = (a, b) => b[elmCategory] - a[elmCategory];
//         response.sort(sortedBy);
//         getS01PlayoffPlayerStats((selectedField = elmCategory));
//       };
//       //end of sorting function
//     }) //enter error (catch) block of promise
//     .catch((error) => {
//       console.log(error);
//     });
// };

//***************************Home page final standings table***************************/
//wrapper function
const setTableS01FinalStandings = () => {
  //inside wrapper function
  //fetch data
  async function getS01FinalStandingsJson() {
    let response = await fetch(
      "./json/s01/s01RegularSeasonFinalStandings.json"
    );
    let data = await response.json();
    let { s01RegularSeasonFinalStandings } = data;
    return s01RegularSeasonFinalStandings;
  }
  //response to fetching data
  getS01FinalStandingsJson()
    .then((response) => {
      //begin building table with fetched data
      let getS01FinalStandings = (selectedField) => {
        let playerStats = "";
        let categories = "";
        if (selectedField == undefined) {
          selectedField = "Points";
        }
        playerStats =
          "<table class='w3-table-all w3-centered w3-large w3-card-4 w3-text-black' style='width: 50%'>" +
          "<caption><h1>Inaugural Hax94 Season</h1></caption>" +
          "<thead><tr>";
        // get column fields from first element in the array of player objects
        fields = Object.keys(response[0]);
        // construct field headers in <th> tags

        let fieldLength = 6;
        for (let i = 0; i < fieldLength; i++) {
          playerStats +=
            "<th style='cursor:pointer' class='w3-hover-yellow' onclick='customS01FinalStandings(this)'>" +
            fields[i] +
            "</th>";
        }
        playerStats += "</tr></thead>";
        //end of field headers and beginning of data for each field

        let participantCount = response.length; // counts all player objects returning all players
        let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
        for (let i = 0; i < participantCount; i++) {
          playerStats += "<tr>";
          for (let j = 0; j < fieldLength; j++) {
            if (fieldsArray[j] == selectedField) {
              playerStats +=
                "<td class='w3-yellow'>" +
                response[i][fieldsArray[j]] +
                "</td>";
            } else {
              playerStats += "<td>" + response[i][fieldsArray[j]] + "</td>";
            }
          }
          playerStats += "</tr>";
        }

        playerStats += "</table>";
        //end of table
        //insert table HTML into selected element
        document.getElementById("tablesDiv").innerHTML = playerStats;
      };
      //go live with this function via running this
      getS01FinalStandings();

      //set sorting function listening in on clicks on <th> elements and set as inline function
      customS01FinalStandings = (category) => {
        let elmCategory = category.textContent;
        sortedBy = (a, b) => b[elmCategory] - a[elmCategory];
        response.sort(sortedBy);
        getS01FinalStandings((selectedField = elmCategory));
      };
      //end of sorting function
    }) //enter error (catch) block of promise
    .catch((error) => {
      console.log(error);
    });
};

//***************************Stats page full final standings table***************************/
//wrapper function
// const setFullTableS01FinalStandings = () => {
//   //inside wrapper function
//   //fetch data
//   async function getS01FinalStandingsJson() {
//     let response = await fetch(
//       "./json/s01/s01RegularSeasonFinalStandings.json"
//     );
//     let data = await response.json();
//     let { s01RegularSeasonFinalStandings } = data;
//     return s01RegularSeasonFinalStandings;
//   }
//   //response to fetching data
//   getS01FinalStandingsJson()
//     .then((response) => {
//       //begin building table with fetched data
//       let getS01FinalStandings = (selectedField) => {
//         let playerStats = "";
//         let categories = "";
//         if (selectedField == undefined) {
//           selectedField = "Points";
//         }
//         playerStats =
//           "<table class='w3-table-all w3-centered w3-large w3-card-4 w3-text-black' style='width: 50%'>" +
//           "<caption><h1>Inaugural Hax94 Season</h1></caption>" +
//           "<thead><tr>";
//         // get column fields from first element in the array of player objects
//         fields = Object.keys(response[0]);
//         // construct field headers in <th> tags

//         let fieldLength = fields.length;

//         for (let i = 0; i < fieldLength; i++) {
//           playerStats +=
//             "<th style='cursor:pointer' class='w3-hover-yellow' onclick='customS01FinalStandings(this)'>" +
//             fields[i] +
//             "</th>";
//         }
//         playerStats += "</tr></thead>";
//         //end of field headers and beginning of data for each field

//         let participantCount = response.length; // counts all player objects returning all players
//         let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
//         for (let i = 0; i < participantCount; i++) {
//           playerStats += "<tr>";
//           for (let j = 0; j < fieldLength; j++) {
//             if (fieldsArray[j] == selectedField) {
//               playerStats +=
//                 "<td class='w3-yellow'>" +
//                 response[i][fieldsArray[j]] +
//                 "</td>";
//             } else {
//               playerStats += "<td>" + response[i][fieldsArray[j]] + "</td>";
//             }
//           }
//           playerStats += "</tr>";
//         }

//         playerStats += "</table>";
//         //end of table
//         //insert table HTML into selected element
//         document.getElementById("tablesDiv").innerHTML = playerStats;
//       };
//       //go live with this function via running this
//       getS01FinalStandings();

//       //set sorting function listening in on clicks on <th> elements and set as inline function
//       customS01FinalStandings = (category) => {
//         let elmCategory = category.textContent;
//         sortedBy = (a, b) => b[elmCategory] - a[elmCategory];
//         response.sort(sortedBy);
//         getS01FinalStandings((selectedField = elmCategory));
//       };
//       //end of sorting function
//     }) //enter error (catch) block of promise
//     .catch((error) => {
//       console.log(error);
//     });
// };

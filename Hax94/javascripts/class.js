class Stats {
  constructor(
    filePath,
    methodName,
    JSONobjectName,
    tableName,
    highlightColor,
    elmName
  ) {
    this.filePath = filePath;
    this.methodName = methodName;
    this.JSONobjectName = JSONobjectName;
    this.tableName = tableName;
    this.highlightColor = highlightColor;
    this.elmName = elmName;
  }

  static screenResize() {
    // insert fetch data function onto <TD> elements in mobile view
    let screenSize = window.innerWidth;

    let methodName = document
      .querySelector("#tablesDiv table th")
      .getAttribute("onclick");

    let mobileTableData = document.querySelectorAll("#tablesDiv table td");
    if (screenSize < 993) {
      for (let i = 0; i < mobileTableData.length; i++) {
        mobileTableData[i].setAttribute("onclick", methodName);
      }
    }
  }

  fetchData = (dataFieldName) => {
    //inside wrapper function
    let self = this;
    //fetch data
    async function fetchJson() {
      let response = await fetch(self.filePath);
      let data = await response.json();
      return data[self.JSONobjectName];
    }
    //response to fetching data
    fetchJson()
      .then((response) => {
        //begin building table with fetched data
        let innerFetchFunction = (selectedField = dataFieldName) => {
          if (!selectedField) {
            let selectedField = "Points";
            let browserWidth = window.innerWidth;
            let playerStats = "";
            //let browserWidth = window.innerWidth; // enables table to be displayed in mobile view
            playerStats =
              "<table>" +
              `<caption><h1>${this.tableName}</h1></caption>` +
              "<thead><tr>";
            // get column fields from first element in the array of player objects
            let fields = Object.keys(response[0]);

            // construct field headers in <th> tags
            let fieldLength = fields.length;
            for (let i = 0; i < fieldLength; i++) {
              playerStats +=
                `<th onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                fields[i] +
                " >" +
                fields[i] +
                "</th>";
            }

            playerStats += "</tr></thead>";

            //end of field headers and beginning of data for each field

            let participantCount = response.length; // counts all player objects returning all players
            let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
            if (browserWidth < 982) {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == selectedField) {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' class=${this.highlightColor} data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            } else {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == selectedField) {
                    playerStats +=
                      `<td class=${this.highlightColor} data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      "<td data-field-name=" + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            }

            playerStats += "</table>";
            //insert table HTML into selected element
            document.getElementById(self.elmName).innerHTML = playerStats;
          } else {
            let thisSelectedField = selectedField.dataset.fieldName;
            let playerStats = "";
            let browserWidth = window.innerWidth; // enables table to be displayed in mobile view
            //set sorting function listening in on clicks on <th> elements and set as inline function
            //dataset retrieves info from html -data attribute
            let sortedBy = (a, b) =>
              b[thisSelectedField] - a[thisSelectedField];
            response.sort(sortedBy);
            //end of sorting function

            playerStats =
              "<table>" +
              `<caption><h1>${this.tableName}</h1></caption>` +
              "<thead><tr>";
            // get column fields from first element in the array of player objects
            let fields = Object.keys(response[0]);

            // construct field headers in <th> tags
            let fieldLength = fields.length;
            for (let i = 0; i < fieldLength; i++) {
              playerStats +=
                `<th onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                fields[i] +
                " >" +
                fields[i] +
                "</th>";
            }

            playerStats += "</tr></thead>";

            //end of field headers and beginning of data for each field

            let participantCount = response.length; // counts all player objects returning all players
            let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
            if (browserWidth < 982) {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == thisSelectedField) {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' class='w3-yellow' data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            } else {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == thisSelectedField) {
                    playerStats +=
                      `<td class=${this.highlightColor} data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      "<td data-field-name=" + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            }

            playerStats += "</table>";
            //insert table HTML into selected element
            document.getElementById(self.elmName).innerHTML = playerStats;
          }
          //end of table
        };

        //go live with this function via running this
        innerFetchFunction();
      }) //enter error (catch) block of promise
      .catch((error) => {
        console.log(error);
      });
  };
}

class ReducedStats extends Stats {
  constructor(
    filePath,
    methodName,
    JSONobjectName,
    tableName,
    highlightColor,
    elmName,
    columns
  ) {
    super(
      filePath,
      methodName,
      JSONobjectName,
      tableName,
      highlightColor,
      elmName
    );
    this.columns = columns;
  }

  fetchData = (dataFieldName) => {
    //inside wrapper function
    let self = this;
    //fetch data
    async function fetchJson() {
      let response = await fetch(self.filePath);
      let data = await response.json();
      return data[self.JSONobjectName];
    }
    //response to fetching data
    fetchJson()
      .then((response) => {
        //begin building table with fetched data
        let innerFetchFunction = (selectedField = dataFieldName) => {
          if (!selectedField) {
            let selectedField = "Points";
            let browserWidth = window.innerWidth;
            let playerStats = "";
            //let browserWidth = window.innerWidth; // enables table to be displayed in mobile view
            playerStats =
              "<table>" +
              `<caption><h1>${this.tableName}</h1></caption>` +
              "<thead><tr>";
            // get column fields from first element in the array of player objects
            let fields = Object.keys(response[0]);
            // construct field headers in <th> tags
            let fieldLength = this.columns;
            for (let i = 0; i < fieldLength; i++) {
              playerStats +=
                `<th onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                fields[i] +
                " >" +
                fields[i] +
                "</th>";
            }

            playerStats += "</tr></thead>";

            //end of field headers and beginning of data for each field

            let participantCount = response.length; // counts all player objects returning all players
            let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
            if (browserWidth < 982) {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == selectedField) {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' class=${this.highlightColor} data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            } else {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == selectedField) {
                    playerStats +=
                      `<td class=${this.highlightColor} data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      "<td data-field-name=" + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            }

            playerStats += "</table>";
            //insert table HTML into selected element
            document.getElementById(self.elmName).innerHTML = playerStats;
          } else {
            let thisSelectedField = selectedField.dataset.fieldName;
            let playerStats = "";
            let browserWidth = window.innerWidth; // enables table to be displayed in mobile view
            //set sorting function listening in on clicks on <th> elements and set as inline function
            //dataset retrieves info from html -data attribute
            let sortedBy = (a, b) =>
              b[thisSelectedField] - a[thisSelectedField];
            response.sort(sortedBy);
            //end of sorting function

            playerStats =
              "<table>" +
              `<caption><h1>${this.tableName}</h1></caption>` +
              "<thead><tr>";
            // get column fields from first element in the array of player objects
            let fields = Object.keys(response[0]);

            // construct field headers in <th> tags
            let fieldLength = this.columns;
            for (let i = 0; i < fieldLength; i++) {
              playerStats +=
                `<th onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                fields[i] +
                " >" +
                fields[i] +
                "</th>";
            }

            playerStats += "</tr></thead>";

            //end of field headers and beginning of data for each field

            let participantCount = response.length; // counts all player objects returning all players
            let fieldsArray = Array.from(fields); // fields is defined above as the keys from first object
            if (browserWidth < 982) {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == thisSelectedField) {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' class='w3-yellow' data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      `<td onclick='${this.methodName}(this)' data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            } else {
              for (let i = 0; i < participantCount; i++) {
                playerStats += "<tr>";
                for (let j = 0; j < fieldLength; j++) {
                  if (fieldsArray[j] == thisSelectedField) {
                    playerStats +=
                      `<td class=${this.highlightColor} data-field-name=` + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  } else {
                    playerStats +=
                      "<td data-field-name=" + //data-fieldNames required for mobile layout
                      fieldsArray[j] +
                      " >" +
                      response[i][fieldsArray[j]] +
                      "</td>";
                  }
                }
                playerStats += "</tr>";
              }
            }

            playerStats += "</table>";
            //insert table HTML into selected element
            document.getElementById(self.elmName).innerHTML = playerStats;
          }
          //end of table
        };

        //go live with this function via running this
        innerFetchFunction();
      }) //enter error (catch) block of promise
      .catch((error) => {
        console.log(error);
      });
  };
}

//**********************CLASS OBJECTS*********************/
// filePath,
// methodName,
// JSONobjectName,
// tableName,
// highlightColor,
// elmName
// columns *in extended class "ReducedStats"

const CLASSsetHomePageTableS01FinalStandings = new ReducedStats(
  "./json/s01/s01RegularSeasonFinalStandings.json",
  " CLASSsetHomePageTableS01FinalStandings.fetchData",
  "s01RegularSeasonFinalStandings",
  "Final Standings",
  "w3-yellow",
  "tablesDiv",
  6
);

const CLASSs01PlayerStats = new Stats(
  "./json/s01/s01PlayerStats.json",
  "CLASSs01PlayerStats.fetchData",
  "s01RegularSeasonPlayerStats",
  "Season Player Stats",
  "w3-yellow",
  "tablesDiv"
);

const CLASSs01PlayoffPlayerStats = new Stats(
  "./json/s01/s01PlayoffPlayerStats.json",
  "CLASSs01PlayoffPlayerStats.fetchData",
  "s01PlayoffPlayerStats",
  "Player Playoff Stats",
  "w3-yellow",
  "tablesDiv"
);

const CLASSsetFullTableS01FinalStandings = new Stats(
  "./json/s01/s01RegularSeasonFinalStandings.json",
  "CLASSsetFullTableS01FinalStandings.fetchData",
  "s01RegularSeasonFinalStandings",
  "Full Table Standings",
  "w3-yellow",
  "tablesDiv"
);

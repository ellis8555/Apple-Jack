import { fullTable, homePageFields, PLAYERS_TABLE, fullTableNoTies, homePageFieldsNoTies } from "../../../constants/consts/supportVars";

// PLACE ARRAYS IN A MAP IN ORDER FOR "sortTable" METHOD TO PROPERLY RETRIEVE DATA ATTRIBUTES
const tableFields = new Map();
tableFields
  .set("fullTable", fullTable)
  .set("homePageFields", homePageFields)
  .set("PLAYERS_TABLE", PLAYERS_TABLE)
  .set("fullTableNoTies", fullTableNoTies)
  .set("homePageFieldsNoTies", homePageFieldsNoTies);

  export default tableFields;
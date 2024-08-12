import { fullTable, homePageFields, playersTable, fullTableNoTies, homePageFieldsNoTies } from "../../../constants/consts/supportVars";

// PLACE ARRAYS IN A MAP IN ORDER FOR "sortTable" METHOD TO PROPERLY RETRIEVE DATA ATTRIBUTES
const tableFields = new Map();
tableFields
  .set("fullTable", fullTable)
  .set("homePageFields", homePageFields)
  .set("playersTable", playersTable)
  .set("fullTableNoTies", fullTableNoTies)
  .set("homePageFieldsNoTies", homePageFieldsNoTies);

  export default tableFields;
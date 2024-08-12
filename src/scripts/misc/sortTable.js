import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import tableDataSource from "../var_lib/maps/tableDataSourceMAP";
import tableFields from "../var_lib/maps/tableFieldsMAP";
import createTable from "../tables/createTable";

export default function sortTable(event) {
    let seasonNumber = event.target.dataset.seasonNumber;
    let caption = document.querySelector("table caption > h1");
    let tableName = caption.textContent;
    let dataName = event.target.dataset.dataSource;
    let data = tableDataSource.get(dataName);
    let color = "w3-yellow";
    let sortBy = event.target.dataset.fieldName;
    let arrayName = event.target.dataset.arraySource;
    let arraySource = tableFields.get(arrayName);
    createTable(
      seasonNumber,
      tableName,
      dataName,
      data,
      color,
      sortBy,
      arrayName,
      arraySource
    );
    setTableListeners();
  }
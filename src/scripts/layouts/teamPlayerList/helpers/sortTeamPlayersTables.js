import sortGroupedStats from "../../../misc/sorting/sort";

function sortTeamPlayersTables(e, tableId, tableHeader, playersTableMode, {PLAYERS_TABLE, fieldsLength, teamColor}){
    const playersTableFragment = document.createDocumentFragment();

    const sortBy = e.target.dataset.fieldName;
    sortGroupedStats(playersTableMode, sortBy);

    const tableContainer = document.createElement('table');
    tableContainer.id = tableId;

    const caption = document.createElement('caption');
    const h3 = document.createElement('h3');
    h3.textContent = tableHeader;

    caption.append(h3);
    tableContainer.append(caption)

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let i = 0; i < fieldsLength; i++) {
        const th = document.createElement('th');
        th.setAttribute('data-field-name', PLAYERS_TABLE[i])
      if (PLAYERS_TABLE[i] == sortBy) {
        th.classList.add('w3-orange')
    }
    th.textContent = PLAYERS_TABLE[i]
    tr.append(th)
    }

    thead.append(tr)

    tableContainer.append(thead)

    const tbody = document.createElement('tbody');

    playersTableMode.forEach(item => {
        const tr = document.createElement('tr');
        for (let i = 0; i < fieldsLength; i++) {
            const td = document.createElement('td');
            td.setAttribute('data-field-name', PLAYERS_TABLE[i])
          if (PLAYERS_TABLE[i] == sortBy) {
            td.classList.add('w3-yellow')
          }
          if (PLAYERS_TABLE[i] == "Name") {
            td.style.color = "#fff";
            td.style.backgroundColor = teamColor;
          }
          td.textContent = item.get(PLAYERS_TABLE[i])
          tr.append(td)
        }
        tbody.append(tr)
    })
    tableContainer.append(tbody)
    playersTableFragment.append(tableContainer);
    return playersTableFragment;
}

export default sortTeamPlayersTables;
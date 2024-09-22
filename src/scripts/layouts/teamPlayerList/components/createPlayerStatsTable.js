    function createPlayerStatsTable(tableId, tableHeading, tableMode = 'season', {PLAYERS_TABLE, seasonSelectedField, playerSeasonObjects, playerPlayoffObjects, playerCombinedObjects, fieldsLength, playoffSelectedField, combinedSelectedField}){
        let seasonModeField;
        let playerModeObjects;
        if(tableMode == 'season'){
            seasonModeField = seasonSelectedField;
            playerModeObjects = playerSeasonObjects;
        } else if(tableMode == 'playoffs'){
            seasonModeField = playoffSelectedField;
            playerModeObjects = playerPlayoffObjects
        } else if(tableMode == 'combined'){
            seasonModeField = combinedSelectedField;
            playerModeObjects = playerCombinedObjects;
        } else {
            seasonModeField = seasonSelectedField
        }
        const tableFrag = document.createDocumentFragment();
        const tableContainer = document.createElement('table')
        tableContainer.id = tableId;
        const tableCaption = document.createElement('caption');
        const tableHeader = document.createElement('h3');
        tableHeader.textContent = tableHeading;

        tableCaption.append(tableHeader)
        tableContainer.append(tableCaption)

        const thead = document.createElement('thead')
        const tr = document.createElement('tr')

        for (let i = 0; i < fieldsLength; i++) {
            const th = document.createElement('th');
            th.setAttribute('data-field-name', PLAYERS_TABLE[i]);
            if (PLAYERS_TABLE[i] == seasonModeField) {
                th.classList.add('w3-orange')
            }
            th.textContent = PLAYERS_TABLE[i]
            tr.append(th)
        }
        thead.append(tr)
        tableContainer.append(thead)

        const tbody = document.createElement('tbody')
        playerModeObjects.forEach((item) => {
        const tr = document.createElement('tr')
        
        for (let i = 0; i < fieldsLength; i++) {
            const td = document.createElement('td')
            td.setAttribute('data-field-name', PLAYERS_TABLE[i])
            td.textContent = item.get(PLAYERS_TABLE[i])
            if (PLAYERS_TABLE[i] == seasonModeField) {
              td.classList.add('w3-yellow')
          }
          tr.append(td)
        }
        tbody.append(tr)
        tableContainer.append(tbody)
        });
        tableFrag.append(tableContainer)
        return tableFrag
    }
    export default createPlayerStatsTable;
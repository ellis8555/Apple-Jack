function boxscorePlayersTableElement(tableHeaders, sortBy){
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')

    thead.append(tr)

    for(let i = 0; i < tableHeaders.length; i++){
        const th = document.createElement('th');
        th.setAttribute('data-field-name', tableHeaders[i]);

        if(tableHeaders[i] == sortBy){
            th.classList.add("w3-orange")
        }

        th.textContent = tableHeaders[i]
        tr.append(th)
    }

    return thead
}

export default boxscorePlayersTableElement;
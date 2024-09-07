function boxscorePlayersTableHeadersElements(tableHeaders, sortBy){
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')

    for(let i = 0; i < tableHeaders.length; i++){
        const th = document.createElement('th');
        th.setAttribute('data-field-name', tableHeaders[i]);
        
        if(tableHeaders[i] == sortBy){
            th.classList.add("w3-orange")
        }
        
        th.textContent = tableHeaders[i]
        tr.append(th)
    }
    
    thead.append(tr)
    return thead
}

export default boxscorePlayersTableHeadersElements;
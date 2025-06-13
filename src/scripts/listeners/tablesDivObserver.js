import getTablesDiv from "../tables/getTablesDiv"

const tablesDiv = getTablesDiv()

const observer = new MutationObserver((mutations) => {
    const isTableDisplayed = tablesDiv.firstElementChild?.tagName === 'TABLE' ? true : false
    if(isTableDisplayed){
        tablesDiv.style.justifyContent = 'start'
        const getTeamsTable = document.querySelector('#tablesDiv > table')
        getTeamsTable.style.margin = 'auto'
    } else {
        tablesDiv.style.justifyContent = 'center'
    }
})


observer.observe(tablesDiv, {
    childList: true
})
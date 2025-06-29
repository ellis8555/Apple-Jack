function getSelectValues() {
    const getRecordsFormSelects = document.querySelectorAll('select')
    const formSelectValues = {}
    getRecordsFormSelects.forEach(select => {
        formSelectValues[select.id] = select.value
    })
    return formSelectValues
}

export default getSelectValues
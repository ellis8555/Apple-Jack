function playersListHeader(seasonNum){
    const h1 = document.createElement('h1');
    h1.textContent = `Season ${seasonNum}`
    return h1;
}

export default playersListHeader
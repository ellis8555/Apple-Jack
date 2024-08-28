function SeasonNumber(seasonNumber) {
    const containerElem = document.createElement("div");
    const headerElem = document.createElement("h3")

    containerElem.className = "gameType";
    headerElem.textContent = `Season ${seasonNumber}`

    containerElem.append(headerElem);
    return containerElem;
}

export default SeasonNumber

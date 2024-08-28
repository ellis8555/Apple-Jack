function TeamRecord(wins, losses, draws) {
    const containerElem = document.createElement("div");
    const headerElem = document.createElement("h3");

    containerElem.classList = "teamRecord";
    headerElem.textContent = `(${wins} - ${losses} - ${draws})`

    containerElem.append(headerElem);
    return containerElem;
}

export default TeamRecord

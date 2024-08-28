function colorPageHeader(){
    const containerElem = document.createElement('div');
    const headerElem = document.createElement('h4')

    containerElem.classList.add("teamColorsHeader", "w3-blue", "w3-round-large")
    headerElem.classList.add("w3-text-black");
    headerElem.textContent = "Copy teams color to clipboard"

    containerElem.append(headerElem);
    return containerElem;
}

export default colorPageHeader;
function parseStringToDOM(htmlString){
    const parser = new DOMParser();
    const parsedCssLogo = parser.parseFromString(htmlString, 'text/html');
    const parsedHTML = parsedCssLogo.body.firstChild;

    return parsedHTML;
}

export default parseStringToDOM;
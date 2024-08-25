function getTeams3dColorScheme(mainColor, colorParts){
    let teams3dColorScheme;
    const colorPartsLength = colorParts.length;
    switch(colorPartsLength){
        case 3:
            teams3dColorScheme = `#${colorParts[2]}`
            return teams3dColorScheme
        case 4:
            teams3dColorScheme = `linear-gradient(to right, #${colorParts[2]} 50%, #${colorParts[3]} 51%)`
            return teams3dColorScheme
        case 5:
            teams3dColorScheme = `linear-gradient(to right, #${colorParts[2]} 35%, #${colorParts[3]} 36% 64%, #${colorParts[4]} 65%)`
            return teams3dColorScheme
            default:
            return `#${mainColor}`
    }
}

export default getTeams3dColorScheme;
function createElement(elementType, ...classes) {
    const element = document.createElement(elementType);
    if(classes){
        element.classList.add(...classes)
    }
    return element;
}

export default createElement
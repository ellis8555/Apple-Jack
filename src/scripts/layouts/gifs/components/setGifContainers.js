function setGifContainers({thisGamesHighlights}){
    const fragment = document.createDocumentFragment();

    // loops through all gifs for this game and only loads img src for the first gif
    // while others have containers created to be observed for intersection
    for (let i = 0; i < thisGamesHighlights.length; i++) {
    let thisGamesFinalPath;
    const theseGifsSubSet = thisGamesHighlights[0].Filepath;
    const thisGifsSubPath = theseGifsSubSet.slice(
      0,
      theseGifsSubSet.length - 6
    );
    // deals with file names 09 or 10 and above
    if (i < 9) {
      thisGamesFinalPath = `${thisGifsSubPath}0${i + 1}.gif`;
    } else {
      thisGamesFinalPath = `${thisGifsSubPath}${i + 1}.gif`;
    }
    const thisGif = thisGamesHighlights.find(
      (item) => item.Filepath == thisGamesFinalPath
    );
          // Create a container for each GIF and comment
    const gifContainer = document.createElement("div");
    gifContainer.style.minHeight = "100px";
    i == 0 ? gifContainer.classList.add("gifContainer", "firstGif") : gifContainer.classList.add("gifContainer", "observedGif")

    gifContainer.setAttribute('data-imgSrc', thisGamesFinalPath)
    gifContainer.setAttribute('data-gifComment', thisGif.Comment)

    // Add the comment to the first gif
    if(i == 0){
    const gifComment = document.createElement("h5");
    gifComment.textContent = thisGif.Comment;
    gifContainer.appendChild(gifComment);

    // Add the GIF image to the first img
    const gifImage = document.createElement("img");
    gifImage.src = thisGamesFinalPath;
    gifContainer.appendChild(gifImage);
    } else {
    // create empty container
    const gifComment = document.createElement("h5");
    gifContainer.append(gifComment)
    // create empty img element
    const gifImage = document.createElement("img");
    gifContainer.append(gifImage)
    }
    fragment.append(gifContainer)
    }
    return fragment
}

export default setGifContainers;
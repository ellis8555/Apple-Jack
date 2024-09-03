function observeGifs(){
    const firstGifContainer = document.querySelectorAll(".firstGif");

    const firstGifObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const gifsComment = entry.target.querySelector("h5");
        const gif = entry.target.querySelector("img");

        if(entry.isIntersecting){
          gifsComment.textContent = entry.target.dataset.gifcomment;
          gif.src = entry.target.dataset.imgsrc;
        } else {
            // Remove the GIF image source when the element is out of view
            gif.src = ''; // Clear the image src
            gifsComment.textContent = ''; 
        }
      })
    },
  {
    rootMargin: "50px"
  })

  firstGifContainer.forEach(gif => {
    firstGifObserver.observe(gif)
  })
    const gifContainers = document.querySelectorAll(".observedGif");

    const followingGifsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const gifsComment = entry.target.querySelector("h5");
        const gif = entry.target.querySelector("img");

        if(entry.isIntersecting){
          gifsComment.textContent = entry.target.dataset.gifcomment;
          gif.src = entry.target.dataset.imgsrc;
        } else {
            // Remove the GIF image source when the element is out of view
            gif.src = ''; // Clear the image src
            gifsComment.textContent = ''; 
        }
      })
    },
  {
    rootMargin: "50px"
  })

  gifContainers.forEach(gif => {
    followingGifsObserver.observe(gif)
  })
  }

  export default observeGifs
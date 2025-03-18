function MainAnnouncement(){
      // Create the first inner div
  const containerElem = document.createElement('div');
  containerElem.style.margin = 'auto';
  containerElem.style.width = '90%';
  containerElem.style.backgroundColor = 'rgb(0, 217, 255)';
  containerElem.style.color = '#000000';

  const headingElem = document.createElement('h5');
  const bold = document.createElement('b')
  bold.textContent = "Season 5 is ready to begin! We have two new players joining us. ComicalFont and Mr T EX. Returning after a long hiatus we have the very creator of this annual tournament in Heinze57.";
  headingElem.append(bold)

  containerElem.append(headingElem);
  return containerElem
}

export default MainAnnouncement;
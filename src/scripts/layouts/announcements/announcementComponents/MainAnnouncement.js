function MainAnnouncement(){
      // Create the first inner div
  const containerElem = document.createElement('div');
  containerElem.style.margin = 'auto';
  containerElem.style.width = '90%';
  containerElem.style.backgroundColor = 'rgb(0,255,0)';
  containerElem.style.color = '#000000';

  const headingElem = document.createElement('h5');
  const bold = document.createElement('b')
  bold.textContent = "Degeneration Hax are your season 4 champions!";
  headingElem.append(bold)

  containerElem.append(headingElem);
  return containerElem
}

export default MainAnnouncement;
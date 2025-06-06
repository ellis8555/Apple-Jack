function MainAnnouncement(){
      // Create the first inner div
  const containerElem = document.createElement('div');
  containerElem.style.margin = 'auto';
  containerElem.style.width = '90%';
  containerElem.style.backgroundColor = '#004953';
  containerElem.style.color = '#ffffff';

  const headingElem = document.createElement('h5');
  const bold = document.createElement('b')
  bold.textContent = "Season 5 has concluded! Scribethonenest are this seasons champions! Lowest season standings finish to ever win the much coveted prize, The Hax94 Cup!";
  headingElem.append(bold)

  containerElem.append(headingElem);
  return containerElem
}

export default MainAnnouncement;
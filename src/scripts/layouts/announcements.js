import closeSidebar from "../sidebar/closeSidebar.js";
import clearScoreboardDiv from "../scoreboard/clearScoreboardDiv.js";

export default function announcements() {
  clearScoreboardDiv();
  
  // Get the display area where you want to add content
  let displayArea = document.getElementById("tablesDiv");

  // Clear any existing content in the display area
  displayArea.innerHTML = '';

  // Create the main container div
  const containerDiv = document.createElement('div');
  containerDiv.className = 'w3-content w3-margin w3-padding w3-round-large w3-display-container w3-margin-top w3-card-4 w3-text-black';

  // Create the first inner div
  const announcementDiv = document.createElement('div');
  announcementDiv.style.margin = 'auto';
  announcementDiv.style.width = '90%';
  announcementDiv.style.backgroundColor = 'rgb(0,255,0)';
  announcementDiv.style.color = '#000000';

  // Create the heading element inside the first inner div
  const heading = document.createElement('h5');
  heading.innerHTML = '<b>Season 4 has begun!</b>';
  announcementDiv.appendChild(heading);

  // Create the paragraph for the main announcement
  const statsParagraph = document.createElement('p');
  statsParagraph.style.backgroundColor = 'orange';
  statsParagraph.innerHTML = '<b>A tonne of stats yet to be created over time. A playoff page, list of Champions etc...</b>';

  // Create the note paragraph with list-style indicators
  const noteParagraph = document.createElement('p');
  noteParagraph.innerHTML = `
    <b>*</b> HaxBall main logo is a link back to home settings of the page. <b>*</b><br>
    <b>**</b> Tables are sortable via clicking the field header. On mobile, click on any row <b>**</b>
  `;

  // Append all elements to the container
  containerDiv.appendChild(announcementDiv);
  containerDiv.appendChild(statsParagraph);
  containerDiv.appendChild(noteParagraph);

  // Append the container to the display area
  displayArea.appendChild(containerDiv);

  // Close the sidebar
  closeSidebar();
}

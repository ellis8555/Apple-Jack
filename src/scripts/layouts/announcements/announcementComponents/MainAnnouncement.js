async function getMessageData(){
  const getMainContent = await fetch("https://hax94-league.s3.us-east-2.amazonaws.com/json/announcements.json", {cache: "no-store"})
  const mainContent = await getMainContent.json()
  const flattenedMainContent = mainContent.mainContent
  return flattenedMainContent
}

const { message, messageBackgroundColor, fontColor } = await getMessageData()

function MainAnnouncement(){
      // Create the first inner div
  const containerElem = document.createElement('div');
  containerElem.style.margin = 'auto';
  containerElem.style.width = '90%';
  containerElem.style.backgroundColor = messageBackgroundColor
  containerElem.style.color = fontColor;

  const headingElem = document.createElement('h5');
  const bold = document.createElement('b')
  bold.textContent = message;
  headingElem.append(bold)

  containerElem.append(headingElem);
  return containerElem
}

export default MainAnnouncement;
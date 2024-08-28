import MainAnnouncement from "./announcementComponents/MainAnnouncement";
import Message from "./announcementComponents/Message";

function AnnouncementsPageLayout(){
    const containerElem = document.createElement('div');
    containerElem.classList.add("w3-content", "w3-margin", "w3-padding", "w3-round-large", "w3-display-container", "w3-margin-top", "w3-card-4", "w3-text-black")

    containerElem.append(MainAnnouncement())
    containerElem.append(Message())
    return containerElem;
}

export default AnnouncementsPageLayout;
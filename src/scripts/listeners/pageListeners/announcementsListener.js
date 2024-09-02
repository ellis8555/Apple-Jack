import setAnnouncements from "../../layouts/announcements/setAnnouncements";
import closeSidebar from "../../sidebar/closeSidebar";

  // announcements page
  document
  .getElementById("announcements")
  .addEventListener("click", () => {
    setAnnouncements()
    setTimeout(() => closeSidebar(), 50)
  });
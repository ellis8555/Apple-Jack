import setTeamsPageLayout from "../../layouts/teamsPageLayout/setTeamsPageLayout";

export default function setListenersMainNavbar() {
    let getTeamsFromNavBar = document.querySelectorAll(".three-d-Logo");
    getTeamsFromNavBar.forEach((item) =>{
      item.addEventListener("click", (e) => {
        const targetElement = e.target.closest(".three-d-Logo")
        if(targetElement){
          setTeamsPageLayout(targetElement)
        }
      })
    }
    );
  }
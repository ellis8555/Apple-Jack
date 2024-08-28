function TeamName(teamName){
const containerElem = document.createElement("div");
const headingTeamNameElem = document.createElement("h1");

containerElem.className=  "teamName";
headingTeamNameElem.textContent = teamName
containerElem.append(headingTeamNameElem)
return containerElem;
}

export default TeamName;
const modeSelectTemplate = document.createElement('template');
modeSelectTemplate.innerHTML = `
  <p style="color:black;background-color: yellow;">Work in progress</p>
  <p style="background-color: green;">Player records for single game or season records</p>
  <form id="leagueRecordsForm">
    <div>
      <label for="type">Type</label>
      <select name="type" id="type">
      <option value="player">Player</option>
      <option value="team" disabled>Team</option>
      </select>
    </div>

    <div>
      <label for="mode">Mode</label>
      <select name="mode" id="mode">
        <option value="all">Combined</option>
        <option value="season">Season</option>
        <option value="playoff">Playoffs</option>
      </select>
    </div>

    <div>
      <label for="seasonNumber">Season Number</label>
      <select name="seasonNumberSelect" id="seasonNumber">
        <option value="all">All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>

    <div>
      <label for="category">Category</label>
      <select name="categorySelect" id="category">
        <option value="Goals">G</option>
        <option value="Assists">A</option>
        <option value="Points">Pts</option>
        <option value="ShotsOnGoal">SOG</option>
        <option value="Kicks">Kicks</option>
        <option value="Passes">Passes</option>
        <option value="OwnGoals">Own Goals</option>
      </select>
    </div>

    <div>
      <label for="per">Per</label>
      <select name="per" id="per">
        <option value="game">Game</option>
        <option value="season">Season</option>
      </select>
    </div>
  </form>

`;

export default function createRecordsForm() {
  return modeSelectTemplate.content.cloneNode(true);
}
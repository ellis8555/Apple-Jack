// used to sort tabular data from both teams and players objects

export default function sortGroupedStats(inputArray, category) {
  inputArray.sort((a, b) => b.get(category) - a.get(category));
}

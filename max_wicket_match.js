const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.espncricinfo.com/series/ipl-2021-1249214/mumbai-indians-vs-chennai-super-kings-27th-match-1254084/full-scorecard",
  callback
);

function callback(error, response, html) {
  if (!error) {
    const manipulationTool = cheerio.load(html);

    let bothTables = manipulationTool(".table.bowler");

    let player = "";
    let maxWicket = 0;

    for (let i = 0; i < bothTables.length; i++) {
      let tableRows = manipulationTool(bothTables[i]).find("tbody tr");
      for (let j = 0; j < tableRows.length; j++) {
        let allRowColumns = manipulationTool(tableRows[j]).find("td");
        let currentPlayerName = manipulationTool(allRowColumns[0]).text();
        let currentPlayerWicket = manipulationTool(allRowColumns[4]).text();

        if (maxWicket < currentPlayerWicket) {
          maxWicket = currentPlayerWicket;
          player = currentPlayerName;
        }
      }
    }
    console.log(player);
  }
}

const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.espncricinfo.com/series/ipl-2021-1249214/mumbai-indians-vs-chennai-super-kings-27th-match-1254084/full-scorecard",
  callback
);

function callback(error, response, html) {
  if (!error) {
    const manipulationTool = cheerio.load(html);

    let allPlayerAnchors = manipulationTool(
      ".Collapsible__contentInner tbody a.small"
    );

    for (let i = 0; i < allPlayerAnchors.length; i++) {
      birth(
        manipulationTool(allPlayerAnchors[i]).text(),
        "https://www.espncricinfo.com" +
          manipulationTool(allPlayerAnchors[i]).attr("href")
      );
    }
  }
}
function birth(playerName, playerURL) {
  request(playerURL, birthFunction);

  function birthFunction(error, response, html) {
    const manipulationTool = cheerio.load(html);
    let list = manipulationTool(".player-card-description.gray-900");
    console.log(manipulationTool(list[1]).text());
    console.log(playerName);
    console.log("___________________");
  }
}

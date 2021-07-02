const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.espncricinfo.com/series/ipl-2021-1249214/mumbai-indians-vs-chennai-super-kings-27th-match-1254084/ball-by-ball-commentary",
  callback
);

function callback(error, response, html) {
  if (!error) {
    const manipulationTool = cheerio.load(html);

    let comments = manipulationTool(".match-comment-long-text p");
    let lastball = manipulationTool(comments[0]).text();
    console.log(lastball);
  }
}

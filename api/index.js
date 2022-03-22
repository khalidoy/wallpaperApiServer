const http = require("http");
const searchScrapper = require("../searchScrapper");
const clickScrapper = require("../clickScrapper");

const server = http.createServer((req, res) => {
  var rawQuery = req.url;
  if (rawQuery.includes("clickedDiv=")) {
    let Query = rawQuery.replace("/clickedDiv=", "");
    let url = "https://wallpapercave.com/" + Query;
    clickScrapper.scrapClick(url).then((p) => {
      let responseFile = p;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(responseFile);
    });
  } else {
    let Query = rawQuery.replace("/", "");
    searchScrapper
      .scrap("https://wallpapercave.com/search?q=" + Query)
      .then((p) => {
        let responseFile = p;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(responseFile);
      });
  }
});

server.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log("eroor");
  } else {
    console.log("listening");
  }
});
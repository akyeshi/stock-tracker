require("dotenv").config();
require("./config/database");

const Ticker = require("./models/ticker");
const data = require("./data");

(async function () {
  const p1 = Ticker.deleteMany({});

  let results = await Promise.all([p1]);

  results = await Promise.all([Ticker.create(data.tickers)]);
  console.log("all created tickers: \n", results[0]);

  results = await Promise.all([Ticker.findOne({ ticker: /AAPL / })]);
  console.log();

  process.exit(); 
})();

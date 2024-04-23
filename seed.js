require("dotenv").config();
require("./config/database");

const Watchlist = require("./models/watchlist");
const Ticker = require("./models/ticker");

const data = require("./data");

(async function () {
  const p1 = Watchlist.deleteMany({});
  const p2 = Ticker.deleteMany({});

  let results = await Promise.all([p1, p2]);

  results = await Promise.all([
    Watchlist.create(data.watchlists),
    Ticker.create(data.tickers),
  ]);
  console.log("all created watchlists: \n", results[0]);
  console.log("all created tickers: \n", results[1]);

  results = await Promise.all([
    Watchlist.findOne({ name: /Blue / }),
    Ticker.findOne({ symbol: /AAPL / }),
  ]);

  // *** is it watchlist or watchlists here ?????
  const watchlist = results[0];
  const aapl = results[1];
  watchlist.stocks.push(aapl._id);
  await watchlist.save();
  console.log("Watchlists with AAPL: ", watchlist);

  process.exit();
})();

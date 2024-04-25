require("dotenv").config();
require("./config/database");

// const Watchlist = require("./models/watchlist");
const Ticker = require("./models/ticker");
// const User = require("./models/user");

const data = require("./data");

(async function () {
  // const p1 = Watchlist.deleteMany({});
  const p2 = Ticker.deleteMany({});
  // const p3 = User.deleteMany({});

  let results = await Promise.all([p2]);

  results = await Promise.all([
    // User.create(data.users),
    Ticker.create(data.tickers),
    // Watchlist.create(data.watchlists),
  ]);
  // console.log("all created users: \n", results[0]);
  console.log("all created tickers: \n", results[0]);
  // console.log("all created watchlists: \n", results[1]);

  results = await Promise.all([
    // Watchlist.findOne({ name: /Blu / }),
    Ticker.findOne({ symbol: /AAPL / }),
  ]);

  // *** is it watchlist or watchlists here ?????
  // const watchlist = results[0];
  // const aapl = results[1];
  // watchlist.stocks.push(aapl._id);
  // await watchlist.save();
  // console.log("Watchlists with AAPL: ", watchlist);

  process.exit();
})();

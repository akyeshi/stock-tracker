const Ticker = require("../models/ticker");
const Watchlist = require("../models/watchlist");

module.exports = {
  index,
  addToWatchlist,
};

// tickersCtrl.index()
async function index(req, res) {
  const tickers = await Ticker.find({});
  res.render("tickers/index", { title: "All Tickers", tickers });
}

// tickersCtrl.addToWatchlist()
async function addToWatchlist(req, res) {
  const watchlist = await Watchlist.findById(req.params.id);
  watchlist.stocks.push(req.body.symbolId);
  await watchlist.save();
  res.redirect(`/watchlists/${watchlist._id}`);
}

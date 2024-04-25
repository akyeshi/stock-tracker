const Ticker = require("../models/ticker");
// const Watchlist = require("../models/watchlist");

module.exports = {
  index,
  // delete: deleteTicker,
  // addToWatchlist,
};

// tickersCtrl.index()
async function index(req, res) {
  let edit = false;
  const tickers = await Ticker.find({});
  res.render("tickers/index", { title: "All Tickers", tickers, edit });
}

/*
// tickersCtrl.deleteTicker()
async function deleteTicker(req, res) {
  const ticker = await Ticker.findOne({
    "ticker._id": req.params.id,
    "ticker.user": req.user._id,
  });
  console.log('ticker -------- \n', ticker); 
  if (!ticker) return res.redirect(`/tickers/${ticker._id}`);
  Ticker.findOneAndDelete(req.params.id); // remove subdoc
  await ticker.save();
  res.redirect(`/tickers/${ticker._id}`);
}

// tickersCtrl.addToWatchlist()
async function addToWatchlist(req, res) {
  const watchlist = await Watchlist.findById(req.params.id);
  watchlist.stocks.push(req.body.symbolId);
  await watchlist.save();
  res.redirect(`/watchlists/${watchlist._id}`);
}
*/

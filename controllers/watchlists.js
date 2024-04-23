const Watchlist = require("../models/watchlist");

module.exports = {
  index,
};

// watchlistsCtrl.index()
async function index(req, res) {
  const watchlists = await Watchlist.find({});
  res.render("watchlists/index", { title: "All Watchlists", watchlists });
}

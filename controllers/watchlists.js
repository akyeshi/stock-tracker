const Watchlist = require("../models/watchlist");
const Ticker = require("../models/ticker");

module.exports = {
  index,
  show,
  create,
  new: newWatchlist,
  delete: deleteWatchlist,
  addToWatchlist, 
};

// watchlistsCtrl.index()
async function index(req, res) {
  const watchlists = await Watchlist.find({});
  res.render("watchlists/index", { title: "All Watchlists", watchlists });
}

// watchlistsCtrl.show()
async function show(req, res) {
  const watchlist = await Watchlist.findById(req.params.id).populate("stocks");
  const tickers = await Ticker.find({ _id: { $nin: watchlist.stocks } }).sort(
    "symbol"
  );
  res.render("watchlists/show", {
    title: watchlist.name,
    watchlist,
    tickers,
  });
}

// watchlistsCtrl.new()
function newWatchlist(req, res) {
  res.render("watchlists/new", { title: "Add New Watchlist", errorMsg: "" });
}

// watchlistsCtrl.create()
async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    // const watchlist = await Watchlist.create(req.body);
    // res.redirect(`/watchlists/${watchlist._id}`);
    await Watchlist.create(req.body);
    res.redirect("/watchlists");
  } catch (error) {
    console.log(error);
    res.render("watchlists/new", { errorMsg: error.message });
  }
}

// watchlistsCtrl.delete()
async function deleteWatchlist(req, res) {
  await Watchlist.findByIdAndDelete({
    _id: req.params.id,
  });
  res.redirect("/watchlists");
}; 

// watchlistsCtrl.addToWatchlist()
async function addToWatchlist(req, res){
  const watchlist = await Watchlist.findById(req.params.id); 
  watchlist.stocks.push(req.body.symbolId); 
  await watchlist.save(); 
  res.redirect(`/watchlists/${watchlist._id}`); 
}

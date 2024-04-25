const Watchlist = require("../models/watchlist");
const Ticker = require("../models/ticker");

const EXPIRE_MS = 5 * 60 * 1000; // 5 minutes
const API_ENDPOINT = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${process.env.ALPHA_API_KEY}&symbol=`;

module.exports = {
  index,
  show,
  create,
  new: newWatchlist,
  delete: deleteWatchlist,
  addToWatchlist,
  deleteTicker,
  edit: editWatchlist,
  update: updateWatchlist,
};

// watchlistsCtrl.index()
async function index(req, res) {
  let edit = false;
  const watchlists = await Watchlist.find({ user: req.user._id });
  res.render("watchlists/index", { title: "All Watchlists", watchlists, edit });
}

// watchlistsCtrl.show()
async function show(req, res) {
  const watchlist = await Watchlist.findById(
    {
      _id: req.params.id, 
      user: req.user._id
    }).populate("stocks");

  const now = new Date();
  for (const ticker of watchlist.stocks) {
    try {
      if (now - ticker.updatedAt > EXPIRE_MS) {
        const url = API_ENDPOINT + ticker.symbol;
        const response = await fetch(url);
        if (!response.ok) throw response;
        const data = await response.json();
        // console.log("--------- \n", data);

        const price = Number(data["Global Quote"]["05. price"]).toFixed(2);
        ticker.price = price;
        await Ticker.findByIdAndUpdate(ticker._id, { price });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const tickers = await Ticker.find({ _id: { $nin: watchlist.stocks } }).sort(
    "symbol"
  );
  let edit = false;
  res.render("watchlists/show", {
    title: watchlist.name,
    edit,
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
    req.body.user = req.user._id;
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
    user: req.user._id
  });
  res.redirect("/watchlists");
}

// watchlistsCtrl.addToWatchlist()
async function addToWatchlist(req, res) {
  const watchlist = await Watchlist.findById(req.params.id);
  watchlist.stocks.push(req.body.symbolId);
  await watchlist.save();
  res.redirect(`/watchlists/${watchlist._id}`);
}

// watchlistsCtrl.deleteTicker()
async function deleteTicker(req, res) {
  const watchlist = await Watchlist.findOne({
    _id: req.params.watchlistId,
    user: req.user._id,
  });
  console.log("watchlist -------- \n", watchlist);
  watchlist.stocks.remove(req.params.tickerId); // remove subdoc
  await watchlist.save();
  res.redirect(`/watchlists/${watchlist._id}`);
}

// watchlistsCtrl.edit()
async function editWatchlist(req, res) {
  const watchlist = await Watchlist.findById(req.params.id).populate("stocks");

  const now = new Date();
  for (const ticker of watchlist.stocks) {
    try {
      if (now - ticker.updatedAt > EXPIRE_MS) {
        const url = API_ENDPOINT + ticker.symbol;
        const response = await fetch(url);
        if (!response.ok) throw response;
        const data = await response.json();
        console.log("--------- \n", data);

        const price = Number(data["Global Quote"]["05. price"]).toFixed(2);
        ticker.price = price;
        await Ticker.findByIdAndUpdate(ticker._id, { price });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const tickers = await Ticker.find({ _id: { $nin: watchlist.stocks } }).sort(
    "symbol"
  );
  let edit = true;
  res.render("watchlists/show", {
    title: watchlist.name,
    edit,
    watchlist,
    tickers,
  });
}

// watchlistsCtrl.update()
async function updateWatchlist(req, res) {
  await Watchlist.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    req.body,
    { new: true } /* returns the updated document */
  );
  res.redirect("/watchlists");
}

/*
{
"Global Quote": {
"01. symbol": "IBM",
"02. open": "183.1700",
"03. high": "184.2900",
"04. low": "181.4000",
"05. price": "184.1000",
"06. volume": "6852997",
"07. latest trading day": "2024-04-24",
"08. previous close": "182.1900",
"09. change": "1.9100",
"10. change percent": "1.0484%"
}
}

// ----------- API error message ------------
{
  Note: 'Thank you for using Alpha Vantage! 
  Our standard API rate limit is 25 requests per day. 
  Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.'

  - $49.99/month: 75 API requests per minutes + 15min delayed US market data 
  - $99.99/month: 150 API requests/hits per minutes + realtime US market data
  - $149.99/month: 300 API requests/hits per minutes + realtime US market data 
  - $199.99/month: 600 
}
*/

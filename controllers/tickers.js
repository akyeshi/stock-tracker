const Ticker = require("../models/ticker");

module.exports = {
  index,
};

//
async function index(req, res) {
  const tickers = await Ticker.find({});
  res.render("tickers/index", { title: "All Tickers", tickers });
}

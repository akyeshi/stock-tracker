const router = require("express").Router();
const tickersCtrl = require("../controllers/tickers");

// GET /tickers
router.get("/tickers", tickersCtrl.index);

// POST /watchlists/:id/tickers (associate a ticker with a watchlist)
router.post("/watchlists/:id/tickers", tickersCtrl.addToWatchlist);

module.exports = router;

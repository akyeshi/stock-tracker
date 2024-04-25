const router = require("express").Router();
const tickersCtrl = require("../controllers/tickers");

// GET /tickers
router.get("/tickers", tickersCtrl.index);

// POST /watchlists/:id/tickers (associate a ticker with a watchlist)
// router.post("/watchlists/:id/tickers", tickersCtrl.addToWatchlist);

// DELETE /tickers/:id
// router.delete("/tickers/:id", tickersCtrl.delete);

module.exports = router;

const router = require("express").Router();
const watchlistsCtrl = require("../controllers/watchlists");

// GET /watchlists
router.get("/", watchlistsCtrl.index);

// GET /watchlists/all
// router.get("/all", watchlistsCtrl.allWatchlists);

// POST /watchlist/:id/tickers
// router.post("/:id/tickers", watchlistsCtrl.add)

// GET /watchlists/new
router.get("/new", watchlistsCtrl.new);

// GET /watchlists/:id
router.get("/:id", watchlistsCtrl.show);

// GET /watchlists/:id/edit
// router.get("/:id/edit", watchlistsCtrl.edit);

// POST /watchlists
router.post("/", watchlistsCtrl.create);

// POST /watchlists/:id/tickers
router.post("/:id/tickers", watchlistsCtrl.addToWatchlist);

// PUT /watchlists/:id
// router.put("/:id", watchlistsCtrl.update);

// DELETE /watchlists/:id
router.delete("/:id", watchlistsCtrl.delete);

module.exports = router;

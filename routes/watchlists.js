const router = require("express").Router();
const watchlistsCtrl = require("../controllers/watchlists");

// GET /watchlists
router.get("/", watchlistsCtrl.index);

// GET /watchlists/all (icebox)
// router.get("/all", watchlistsCtrl.allWatchlists);

// GET /watchlists/new
router.get("/new", watchlistsCtrl.new);

// GET /watchlists/:id
router.get("/:id", watchlistsCtrl.show);

// POST /watchlists
router.post("/", watchlistsCtrl.create);

// POST /watchlists/:id/tickers
router.post("/:id/tickers", watchlistsCtrl.addToWatchlist);

// PUT /watchlists/:id
router.put("/:id", watchlistsCtrl.update);

// DELETE /watchlists/:id
router.delete("/:id", watchlistsCtrl.delete);

// DELETE /watchlists/:id/tickers/:id
router.delete("/:watchlistId/tickers/:tickerId", watchlistsCtrl.deleteTicker);

module.exports = router;

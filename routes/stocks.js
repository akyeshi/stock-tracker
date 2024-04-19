const express = require("express");
const router = express.Router();
const yahooFinance = require("yahoo-finance");

router.get("/:symbol", (req, res) => {
  const symbol = req.params.symbol;

  yahooFinance.quote(
    {
      symbol: symbol,
      modules: ["price", "summaryDetail"],
    },
    (err, quotes) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error fetching stock data" });
      }

      res.json(quotes);
    }
  );
});

router.get("/:symbol/history", (req, res) => {
  const symbol = req.params.symbol;
  const { from, to } = req.query;

  yahooFinance.historical(
    {
      symbol: symbol,
      from: from,
      to: to,
    },
    (err, quotes) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error fetching historical data" });
      }

      res.json(quotes);
    }
  );
});

module.exports = router;

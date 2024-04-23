const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tickerSchema = new Schema(
  {
    ticker: {
      type: String,
      unique: true,
      required: true,
    },
    name: String, 
    price: Number,
    currency: String,
    ceo: String,
    avgVolume: Number,
    marketcap: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticker", tickerSchema);

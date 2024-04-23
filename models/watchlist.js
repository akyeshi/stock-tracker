// require mongoose and initialize a Schema class
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema(
  {
    name: String,
    stock: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticker",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userName: String,
    userAvatar: String,
  },
  {
    timstamps: true,
  }
);


// compile schema into a model and export it into WAtchlist controller module
module.exports = mongoose.model("Watchlist", watchlistSchema); 
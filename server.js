const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

require("dotenv").config();
require("./config/database");
require("./config/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tickersRouter = require("./routes/tickers");
const watchlistsRouter = require("./routes/watchlists");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// mount passport after session but before routes that would need to access the current user
app.use(passport.initialize());
app.use(passport.session());
// instead of having to pass 'req.user' everytime we render a ejs template
// take advantage of express' 'res.locals' object to return 'req.user' in a custom middleware function
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next(); // next is not needed if route does res.render('template', cb)
});

app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", tickersRouter);
app.use("/watchlists", watchlistsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

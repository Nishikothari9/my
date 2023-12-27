const ejs = require("ejs");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const routes = require("./routes/v1");
const AppError = require("./utils/AppError");
const path = require("path");
const session = require("express-session");
const PORT = 3002;
const app = express();

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
// send back a 404 error for any unknown api request
app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  res.send("404 API", req.originalUrl);
});
// enable cors
app.use(cors());
app.options("*", cors());
// Setting up session storage for admin
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: true,
  })
);

// set view engine for admin
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set path for static assets
app.use(express.static(path.join(__dirname, "public")));

// to display images
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// set security HTTP headers
// Note: admin form script will not work.
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression -> It will reducue the data size coming from the server response.
app.use(compression());

// v1 api routes
app.use("/", routes);

module.exports = app;

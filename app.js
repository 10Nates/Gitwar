// Main File

// Includes
const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const app = express();
const expressLayouts = require("express-ejs-layouts");

defaultProfile = {
  avatar:
    "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png",
  username: "Jhon Doe",
  name: "",
  public_repos: "",
  repo_stars: "",
  repo_forks: "",
  followers: "",
  user_orgs: "",
  score: "",
  url: "",
};

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// EJS Middlewares
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Include Routes
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const compareRouter = require("./routes/compare");
const badgeRouter = require("./routes/badge");
const apiRouter = require("./routes/api");
const topRouter = require("./routes/top");
const NullRouter = require("./routes/null");

// Use Routes
app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/compare", compareRouter);
app.use("/badge", badgeRouter);
app.use("/api", apiRouter);
app.use("/top", topRouter);
app.use("/NULL", NullRouter);

// const PORT = process.env.PORT || 3000;

if (!process.env.GITHUB_TOKEN) {
  // Unauthorized github requests have a rate limit 
  // of 60/hour, which is borderline unusable
  throw "No Github Token provided in environment Variables! Please provide GITHUB_TOKEN!"
}

// Serverless functions (Netlify integration)
module.exports = app;
module.exports.handler = serverless(app);
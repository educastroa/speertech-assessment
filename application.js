require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

// ** Uncoment for production environment**
// db.connect()
// .then(() => {
//   console.log(`Connected to ${dbParams.database} database`);
// })
// .catch(() => console.log("Error while connecting to DB please try again"));
// ** =================================== **

const usersRoutes = require("./routes/users");
const tweetsRoutes = require("./routes/tweets");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(express.static("public"));

app.use("/api/users", usersRoutes(db));
app.use("/api/tweets", tweetsRoutes(db));

const testSetup = function application() {
  app.close = function () {
    return db.end();
  };
  return app;
};

module.exports = {
  app,
  testSetup,
};

// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const { Client } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Client(dbParams);

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  const schemaFilenames = fs.readdirSync("./db/schema");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, "utf8");
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  const schemaFilenames = fs.readdirSync("./db/seeds");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8");
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    dbParams.host;
    dbParams.connectionString;
    await db.connect();
    await runSchemaFiles();
    await runSeedFiles();
    console.log(chalk.cyan(`-> Database reset`));
    db.end();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    db.end();
  }
};

// runResetDB();

module.exports = { runResetDB };

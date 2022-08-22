/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        return res.status(200).send({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const queryString = `SELECT * FROM users WHERE email = $1;`;
    db.query(queryString, [email])
      .then((data) => {
        const user = data.rows[0];

        if (!user) {
          return res
            .status(400)
            .send({ message: "Username not found in database" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
          return res
            .status(400)
            .send({ message: "Password does not match username" });
        }

        req.session.user_id = user.id;
        return res.status(200).send({ ...user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/me", (req, res) => {
    const user_id = req.session.user_id;
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;`;

    db.query(queryString, [user_id])
      .then((data) => {
        const user = data.rows[0];

        if (!user) {
          return res
            .status(400)
            .send({ message: "Username not found in database" });
        }

        return res.status(200).send({ ...user });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.status(200).send({ message: "Logged out!" });
  });

  router.post("/register", (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!email.length || !password.length) {
      return res.status(400).send({ error: "Email and/or password cannot be empty" });
    }

    db.query(`SELECT * from users WHERE email = $1;`, [email])
    .then((data) => {
      const user = data.rows[0];

      // Check if username exists in the DB and return error message
      if (user) {
        return res.status(403).send({ error: "email already exists" });
      }
      // Otherwise create username and hash the password

      const queryString = `INSERT INTO users
      (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4) RETURNING *;`;

      db.query(queryString, [first_name, last_name, email, hashedPassword]
      )
        .then((data) => {
          const user = data.rows[0];

          req.session.user_id = user.id;
          return res.status(200).send({ ...user });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

  return router;
};

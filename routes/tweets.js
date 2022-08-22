const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //  description: saves a job to the user's saved jobs

  router.post("/save", (req, res) => {
    const {
      tweet_link,
      tweet_content,
      unique_tweet_id,
      user_id,
    } = req.body;

    const tweet_posted_at = new Date();

    db.query(
      `
          INSERT INTO tweets
          ( tweet_posted_at,
            tweet_link,
            tweet_content,
            unique_tweet_id,
            user_id
          )
          VALUES ($1, $2, $3, $4, $5);
        `,
      [
      tweet_posted_at,
      tweet_link,
      tweet_content,
      unique_tweet_id,
      user_id,
      ]
    )
      .then((data) => {
        return res.status(200).send();
      })
      .catch((err) => console.log("error", err));
  });

  router.get("/saved", (req, res) => {
    // const user_id = req.session.user_id;
    //**Could not find a way to set a Cookie in test mode, thus commented out line
    // and sent user info **

    const { user_id } = req.body;

    db.query(
      `
      SELECT *
      FROM tweets
      WHERE user_id = $1
    `,
      [user_id]
    )
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => console.log("error: ", err));
  });

  router.delete("/delete/:tweet_id", (req, res) => {
    const unique_tweet_id = req.params.tweet_id;
    db.query(
      `
          DELETE FROM tweets
          WHERE unique_tweet_id = $1;
        `,
      [unique_tweet_id]
    )
      .then((data) => {
        return res.status(200).send();
      })
      .catch((err) => console.log("error", err));
  });

  router.patch("/update/:tweet_id", (req, res) => {
    const unique_tweet_id = req.params.tweet_id;
    const { tweet_content } = req.body;
    console.log('testcasdffds');
    db.query(
      `
          UPDATE tweets
          SET tweet_content = $1
          WHERE unique_tweet_id = $2;
        `,
      [tweet_content, unique_tweet_id]
    )
      .then((data) => {
        return res.status(200).send();
      })
      .catch((err) => console.log("error", err));
  });



  return router;
};

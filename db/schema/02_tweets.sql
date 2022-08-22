-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS tweets CASCADE;
CREATE TABLE tweets (
  id SERIAL PRIMARY KEY NOT NULL,
  tweet_posted_at TIMESTAMP NOT NULL,
  tweet_link VARCHAR(255) NOT NULL,
  tweet_content VARCHAR(255) NOT NULL,
  unique_tweet_id VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

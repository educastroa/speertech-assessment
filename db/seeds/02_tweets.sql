-- Tweets table seeds here (Example)
ALTER TABLE tweets
ALTER COLUMN tweet_posted_at
SET DEFAULT
'2022-08-22T01:56:23.717Z';

INSERT INTO tweets (
tweet_link,
tweet_content,
unique_tweet_id,
user_id)
VALUES (
'faketweet.com',
'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
'PYoQg0l7pFdhgf',
1
),
(
'faketweet.com',
'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
'PYoQg0l7pNzode',
2
);

const request = require("supertest");
const { testSetup } = require("../application");
const { runResetDB } = require("../bin/resetdb");

describe("Interviewers", () => {
  let app;

  beforeAll(() => {
    app = testSetup();
  });

  afterAll(async () => {
    await runResetDB();
    app.close();
  });

  test("POST /api/tweets/save, Expect 200 response if data sent is sucessfully saved on DB", async () => {
    await request(app)
      .post("/api/tweets/save")
      .send({
        tweet_link: "test.com",
        tweet_content:
          "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
        unique_tweet_id: "P7QOT37uGnPZSw",
        user_id: 2,
      })
      .expect(200);
  });

  test("GET /api/tweets/saved, Expect 200 response if tweet from specific user is retrived from DB", async () => {
    await request(app)
      .get("/api/tweets/saved")
      .send({ user_id: 1 })
      .expect(200, [
        {
          id: 1,
          tweet_posted_at: "2022-08-22T05:56:23.717Z",
          tweet_link: "faketweet.com",
          tweet_content:
            "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          unique_tweet_id: "PYoQg0l7pFdhgf",
          user_id: 1,
        },
      ]);
  });

  test("PATCH /api/tweets/update, Expect 200 response if tweet id provided is sucessfully updated", async () => {
    const unique_tweet_id = "P7QOT37uGnPZSw";
    await request(app)
      .patch(`/api/tweets/update/${unique_tweet_id}`)
      .send({ tweet_content: "testing updating tweet content" })
      .expect(200);
  });

  test("DELETE /api/tweets/delete, Expect 200 response if specific tweet id is removed from DB", async () => {
    const unique_tweet_id = "P7QOT37uGnPZSw";
    await request(app)
      .delete(`/api/tweets/delete/${unique_tweet_id}`)
      .expect(200);
  });
});

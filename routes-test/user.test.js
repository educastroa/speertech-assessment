const request = require("supertest");
const { testSetup } = require("../application");
const { runResetDB } = require("../bin/resetdb");

describe("Interviewers", () => {
  let app;

  beforeAll(() => {
    app = testSetup();
  });

  // beforeEach(async () => {
  //   await
  //   runResetDB();
  // });

  afterAll(async () => {
    await runResetDB();
    await app.close();
  });

  test("GET /api/users, Expect 200 response and returns the correct users in the database", async () => {
    await request(app)
      .get("/api/users")
      .expect(200, {
        users: [
          {
            id: 1,
            first_name: "Alice",
            last_name: "Smith",
            email: "alice@test.com",
            password:
              "$2a$12$g7.PYo/Qg0l7pNzodeP7QOT37uGnPZSw.asXfGDKX/h36SOnau/fO",
          },
          {
            id: 2,
            first_name: "Kira",
            last_name: "Smith",
            email: "kira@test.com",
            password:
              "$2a$12$g7.PYo/Qg0l7pNzodeP7QOT37uGnPZSw.asXfGDKX/h36SOnau/fO",
          },
        ],
      });
  });

  test("POST /api/users/login, Expect 200 response login in with correct email and password", async () => {
    await request(app)
      .post("/api/users/login")
      .send({
        email: "alice@test.com",
        password: "test",
      })
      .expect(200);
  });

  test("POST /api/users/login, Expect 200 response registering a new user with distinct email", async () => {
    await request(app)
      .post("/api/users/login")
      .send({
        email: "alice@test.com",
        password: "test",
      })
      .expect(200);
  });

  test("POST /api/users/register, Expect 200 response registering a new user with distinct email", async () => {
    await request(app)
      .post("/api/users/register")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        password: "test",
      })
      .expect(200);
  });

  test("POST /api/register, Expect 403 response registering with a existing email  ", async () => {
    await request(app)
      .post("/api/users/register")
      .send({
        first_name: "test",
        last_name: "test",
        email: "alice@test.com",
        password: "test",
      })
      .expect(403, {
        error: "email already exists",
      });
  });

});

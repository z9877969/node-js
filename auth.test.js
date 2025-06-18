const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");
const User = require("./models/user");
const services = require("./services/usersServices");

require("dotenv").config(app);

const { TEST_DB_HOST, PORT = 4040 } = process.env;

describe("test routes users", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(TEST_DB_HOST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropCollection(() =>
      mongoose.connection.close(() => done())
    );
  });

  test("test route login", async () => {
    const newUser = {
      email: "bart@mail.com",
      password: "xxxxxxxx",
    };

    const user = await services.registerUser(newUser);

    // відповідь повина мати статус-код 200
    // у відповіді повинен повертатися токен
    // у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

    const loginUser = {
      email: "bart@mail.com",
      password: "xxxxxxxx",
    };

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body.user).toEqual(loginUser);
  });
});

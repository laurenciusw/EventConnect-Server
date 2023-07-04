const request = require("supertest");
const app = require("../../app");
const { sequelize, User } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");

let token;
beforeAll(async () => {
  let passowordHash = hashPassword("12345");
  await sequelize.queryInterface.bulkInsert("Users", [
    {
      username: "bejo",
      email: "bejo@gmail.com",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      password: passowordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  let user = await User.findByPk(1);

  let payload = {
    id: user.id,
  };

  token = signToken(payload);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe.skip("GET for event", () => {
  test("GET /api/users return 200 get profile user", async () => {
    const response = await request(app)
      .get(`/api/users`)
      .set("access_token", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", expect.any(String));
    expect(response.body).toHaveProperty("password", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("gender", expect.any(String));
    expect(response.body).toHaveProperty("birthDate", expect.any(String));
    expect(response.body).toHaveProperty("province", expect.any(String));
    expect(response.body).toHaveProperty("city", expect.any(String));
    expect(response.body).toHaveProperty("phoneNumber", expect.any(String));
    expect(response.body).toHaveProperty("profilePicture", expect.any(String));
  });

  test("GET /api/users return 401 authorized", async () => {
    const response = await request(app)
      .get(`/api/users`)
      .set("access_token", "token palsu");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });
});

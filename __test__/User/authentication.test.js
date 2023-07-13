const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");

beforeAll(async () => {
  let passowordHash = hashPassword("12345");
  await sequelize.queryInterface.bulkInsert("Users", [
    {
      username: "bejo",
      email: "bejo@gmail.com",
      password: passowordHash,
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("POST for register", () => {
  test("POST /register return 201 create account", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "customer",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /register return 409 email must be unique", async () => {
    const dataBody = {
      username: "bejo",
      email: "bejo@gmail.com",
      password: "customer",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(409);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /register return 400 username is required", async () => {
    const dataBody = {
      email: "rizki@gmail.com",
      password: "customer",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 password required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "1234",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 password less than 5 characters", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 email required", async () => {
    const dataBody = {
      username: "rizki",
      password: "customer",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 email Email must be in email format", async () => {
    const dataBody = {
      email: "rizkisadfas",
      username: "rizki",
      password: "customer",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 birthDate required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "12345",
      gender: "male",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 gender required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "12345",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 city required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "12345",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 province required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "12345",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      city: "pekanbaru",
      phoneNumber: "0834523454",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });

  test("POST /register return 400 phoneNumber required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "12345",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      profilePicture:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });
  test("POST /register return 400 profilePicture required", async () => {
    const dataBody = {
      username: "rizki",
      email: "rizki@gmail.com",
      password: "12345",
      gender: "male",
      birthDate: "2023-07-03 06:37:01.733 +00:00",
      province: "riau",
      city: "pekanbaru",
      phoneNumber: "0834523454",
    };

    const response = await request(app).post("/api/register").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
  });
});

describe("POST for login", () => {
  test("POST /login return 200 succes login", async () => {
    const dataBody = { email: "bejo@gmail.com", password: "12345" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
  });

  test("POST /login return 401 email is required", async () => {
    const dataBody = { password: "123456" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /login return 401 password is required", async () => {
    const dataBody = { email: "bejo@gmail.com" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /login return 401 not registered", async () => {
    const dataBody = { email: "bejo@gmail.com", password: "123456" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /login return 401 not registered", async () => {
    const dataBody = { email: "bej@gmail.com", password: "12345" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("POST /login return 401 not registered", async () => {
    const dataBody = { email: "bejo@gmail.com", password: "123456" };

    const response = await request(app).post("/api/login").send(dataBody);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

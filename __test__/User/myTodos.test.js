const request = require("supertest");
const app = require("../../app");
const { sequelize, User } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");

let token;
beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert("Events", [
    {
      name: "Enchanted Rhythm Music Festival",
      location: "Bali",
      category: "Music and Concerts",
      startDate: "2023-07-15",
      endDate: "2023-07-18",
      status: "Active",
      registrationDate: "2023-07-01",
      OrganizerId: 1,
      imageUrl:
        "https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?w=740&t=st=1688106650~exp=1688107250~hmac=188f6669bfe1b61d34403d7671b38331a827b798ff7317ef9a5029b0ed0d95ad",
      description:
        "Immerse yourself in the enchanting world of music by volunteering to organize the Enchanted Rhythm Music Festival in Bali. Join us in creating a harmonious experience for music lovers from around the world.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
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

  await sequelize.queryInterface.bulkInsert("JobDesks", [
    {
      name: "ngepel",
      EventId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  await sequelize.queryInterface.bulkInsert("ToDoLists", [
    {
      name: "mengatur panggung",
      status: false,
      JobDeskId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("ToDoLists", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("JobDesks", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Events", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("GET for event", () => {
  test("GET /api/mytodo", async () => {
    const response = await request(app)
      .get(`/api/mytodo/1`)
      .set("access_token", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("EventId", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("ToDoLists", expect.any(Array));
  });
});

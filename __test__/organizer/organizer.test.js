const app = require("../../app");
const request = require("supertest");
const { sequelize } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");

let access_token;

const loginAccount = {
  organizerName: "Creative Art Society",
  type: "Non-Governmental Organization",
  dateFound: "2020-10-15",
  personName: "John Doe",
  contactPerson: "+1234567890",
  contactOrganizer: "+9876543210",
  email: "creativeart@example.com",
  password: hashPassword("rahasia"),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const custObj = {
  organizerName: "Creative Art Society2",
  type: "Non-Governmental Organization",
  dateFound: "2020-10-15",
  personName: "John Doe",
  contactPerson: "+1234567890",
  contactOrganizer: "+9876543210",
  email: "creativeart2@example.com",
  password: hashPassword("rahasia"),
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  try {
    await sequelize.queryInterface.bulkInsert("Organizers", [loginAccount]);

    const token = await signToken({ id: 1 });
    access_token = token;

    const insertEvent = await sequelize.queryInterface.bulkInsert("Events", [
      {
        name: "Creative Art Society",
        location: "Non-Governmental Organization",
        startDate: new Date(),
        imageUrl:
          "https://static1.squarespace.com/static/61001e71b0a4ce3c2635f669/t/6137632f4e68712eca046a40/1632268825350/CAS+Logo+from+Debbie+R.jpg?format=1500w",
        description: "+1234567890",
        endDate: new Date(),
        registrationDate: new Date(),
        category: "category",
        status: "status",
        createdAt: new Date(),
        updatedAt: new Date(),
        OrganizerId: 1,
      },
    ]);

    await sequelize.queryInterface.bulkInsert("JobDesks", [
      {
        name: "JobDesk",
        EventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error, ">>>>>>>>>>>>>");
  }

  // access_token = await
  // const organizer = require('../../data.json').organizer.map(el => {
  //   el.createdAt = new Date()
  //   el.updatedAt = new Date()
  //   return el
  // })
  // await sequelize.queryInterface.bulkInsert('Organizers', organizer)
});

afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete("Organizers", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await sequelize.queryInterface.bulkDelete("Events", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await sequelize.queryInterface.bulkDelete("JobDesks", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await sequelize.queryInterface.bulkDelete("TodoLists", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  } catch (error) {}
});

describe.skip("login organizer", () => {
  it("should login organizer and return 200", async () => {
    const response = await request(app)
      .post("/loginorganizer")
      .send({ email: loginAccount.email, password: "rahasia" });

    access_token = response.body;

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe.skip("create organizer", () => {
  it("should create organizer and return 201", async () => {
    const response = await request(app)
      .post("/organizers")
      .send(custObj)
      .set("access_token", access_token);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "organizerName",
      custObj.organizerName
    );
    expect(response.body).toHaveProperty("type", custObj.type);
    expect(response.body).toHaveProperty("id", expect.any(Number));
  });
});

describe.skip("create TodoList", () => {
  it("should create TodoList and return 201", async () => {
    const response = await request(app)
      .post("/todolists")
      .send({ name: ["running"], EventId: 1, JobDeskId: 1 })
      .set("access_token", access_token.access_token);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("name", "running");
    expect(response.body[0]).toHaveProperty("EventId", 1);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
  });
});

describe.skip("read organizer", () => {
  it("should read all organizer and return 200", async () => {
    const response = await request(app)
      .get("/organizers")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty(
      "organizerName",
      loginAccount.organizerName
    );
    expect(response.body[0]).toHaveProperty("type", loginAccount.type);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
  });
});

describe.skip("put organizer", () => {
  it("should change organizer and return 200", async () => {
    const response = await request(app)
      .put("/organizers/1")
      .send({
        organizerName: "Creative Art Society3",
        type: "Non-Governmental Organization3",
        dateFound: "2020-10-15",
        personName: "John Doe",
        contactPerson: "+1234567890",
        contactOrganizer: "+9876543210",
        email: "creativeart@example.com",
        password: "rahasia",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("access_token", access_token.access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toBe(1);
    // expect(response.body).toHaveProperty('id', custObj.id);
    // expect(response.body).toHaveProperty('organizerName', "Creative Art Society1");
    // expect(response.body).toHaveProperty('type', "Non-Governmental Organization1");
    // expect(response.body).toHaveProperty('id', expect.any(Number));
  });
});

describe.skip("delete organizer", () => {
  it("should delete organizer and return 200", async () => {
    const response = await request(app)
      .delete("/organizers/2")
      .set("access_token", access_token.access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBe(1);
    // expect(response.body).toBeInstanceOf(Number);
    // expect(response.body).toHaveProperty('id', custObj.id);
    // expect(response.body).toHaveProperty('organizerName', "Creative Art Society1");
    // expect(response.body).toHaveProperty('type', "Non-Governmental Organization1");
    // expect(response.body).toHaveProperty('id', expect.any(Number));
  });
});

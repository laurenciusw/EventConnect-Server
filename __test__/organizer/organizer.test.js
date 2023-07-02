const app = require('../../app')
const request = require('supertest');
const { sequelize } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");

beforeAll(async () => {
  // await sequelize.queryInterface.bulkInsert('Users', [{
  //   username: 'username', password: hashPassword('customer'), email: "user@user.com", gender: "male",
  //   birthDate: new Date(), province: "DIY", city: "Jogja", phoneNumber: "12345", jobDesk: "test",
  //   isPremium: true,
  //   createdAt: new Date(), updatedAt: new Date(),
  // }])

  // const organizer = require('../../data.json').organizer.map(el => {
  //   el.createdAt = new Date()
  //   el.updatedAt = new Date()
  //   return el
  // })
  // await sequelize.queryInterface.bulkInsert('Organizers', organizer)

})

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete('Organizers', null, {
    truncate: true, restartIdentity: true, cascade: true
  });
})

const custObj = {
  "id": 1,
  "organizerName": "Creative Art Society",
  "type": "Non-Governmental Organization",
  "dateFound": "2020-10-15",
  "personName": "John Doe",
  "contactPerson": "+1234567890",
  "contactOrganizer": "+9876543210",
  "email": "creativeart@example.com",
  "password": "rahasia",
  "createdAt" : new Date(),
  "updatedAt" : new Date()
}

describe('create organizer', () => {

  it('should create organizer and return 201', async () => {

    const response = await request(app)
      .post('/organizers')
      .send(custObj)

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('id', custObj.id);
    expect(response.body).toHaveProperty('organizerName', custObj.organizerName);
    expect(response.body).toHaveProperty('type', custObj.type);
    expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});

describe('read organizer', () => {

  it('should read all organizer and return 200', async () => {

    const response = await request(app)
      .get('/organizers')

    expect(response.status).toBe(200)
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty('id', custObj.id);
    expect(response.body[0]).toHaveProperty('organizerName', custObj.organizerName);
    expect(response.body[0]).toHaveProperty('type', custObj.type);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
  });

});

describe('put organizer', () => {

  it('should change organizer and return 200', async () => {

    const response = await request(app)
      .put('/organizers/1')
      .send({
        "organizerName": "Creative Art Society1",
        "type": "Non-Governmental Organization1",
        "dateFound": "2020-10-15",
        "personName": "John Doe",
        "contactPerson": "+1234567890",
        "contactOrganizer": "+9876543210",
        "email": "creativeart@example.com",
        "password": "rahasia",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      })

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toBe(1)
    // expect(response.body).toHaveProperty('id', custObj.id);
    // expect(response.body).toHaveProperty('organizerName', "Creative Art Society1");
    // expect(response.body).toHaveProperty('type', "Non-Governmental Organization1");
    // expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});

describe('delete organizer', () => {

  it('should delete organizer and return 200', async () => {

    const response = await request(app)
      .delete('/organizers/1')

    expect(response.status).toBe(200)
    expect(response.body).toBe(1)
    // expect(response.body).toBeInstanceOf(Number);
    // expect(response.body).toHaveProperty('id', custObj.id);
    // expect(response.body).toHaveProperty('organizerName', "Creative Art Society1");
    // expect(response.body).toHaveProperty('type', "Non-Governmental Organization1");
    // expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});
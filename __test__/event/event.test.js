const app = require('../../app')
const request = require('supertest');
const { sequelize } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");
const { signToken } = require('../../helpers/jwt');

let access_token;

const loginAccount = {
  "organizerName": "Creative Art Society",
  "type": "Non-Governmental Organization",
  "dateFound": "2020-10-15",
  "personName": "John Doe",
  "contactPerson": "+1234567890",
  "contactOrganizer": "+9876543210",
  "email": "creativeart@example.com",
  "password": "rahasia"
}

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert('Organizers', [{
    "organizerName": "Creative Art Society",
    "type": "Non-Governmental Organization",
    "dateFound": "2020-10-15",
    "personName": "John Doe",
    "contactPerson": "+1234567890",
    "contactOrganizer": "+9876543210",
    "email": "creativeart@example.com",
    "password": hashPassword('rahasia'),
    "createdAt" : new Date(),
    "updatedAt" : new Date()
  }])

  
  // await sequelize.queryInterface.insert('Organizers', loginAccount)

  const token = await signToken({ id: 1 })
  access_token = token

  // const response = await request(app)
  // .post('/loginorganizer')
  // .send({email: loginAccount.email, password: loginAccount.password})

  // access_token = response.body

  // const organizer = require('../../data.json').organizer.map(el => {
  //   el.createdAt = new Date()
  //   el.updatedAt = new Date()
  //   return el
  // })

  // await sequelize.queryInterface.bulkInsert('Organizers', organizer)

})

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete('Events', null, {
    truncate: true, restartIdentity: true, cascade: true
  });

  await sequelize.queryInterface.bulkDelete('Organizers', null, {
    truncate: true, restartIdentity: true, cascade: true
  });

})

const custObj = {
  "name": "Creative Art Society",
  "location": "Non-Governmental Organization",
  "startDate": new Date(),
  "imageUrl": "https://static1.squarespace.com/static/61001e71b0a4ce3c2635f669/t/6137632f4e68712eca046a40/1632268825350/CAS+Logo+from+Debbie+R.jpg?format=1500w",
  "description": "+1234567890",
  "endDate": new Date(),
  "registrationDate": new Date(),
  "category": "category",
  "status": "status",
  "benefit": [{"name": "benefit1"}, {"name": "benefit2"}],
  "jobdesk": [{"name": "jobdesk1"}, {"name": "jobdesk2"}],
  "createdAt" : new Date(),
  "updatedAt" : new Date()
}

describe('create event', () => {

  it('should create event and return 201', async () => {

    const response = await request(app)
      .post('/events')
      .send(custObj)
      .set('access_token', access_token)

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('name', custObj.name);
    expect(response.body).toHaveProperty('imageUrl', custObj.imageUrl);
    expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});

describe('read event', () => {

  it('should read all event and return 200', async () => {

    const response = await request(app)
      .get('/events')
      .set('access_token', access_token)

    expect(response.status).toBe(200)
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty('name', custObj.name);
    expect(response.body[0]).toHaveProperty('imageUrl', custObj.imageUrl);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
  });

  it('should read all event by organizer id and return 200', async () => {

    const response = await request(app)
      .get('/eventsByOrganizer')
      .set('access_token', access_token)

    expect(response.status).toBe(200)
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty('name', custObj.name);
    expect(response.body[0]).toHaveProperty('imageUrl', custObj.imageUrl);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
  });

  it('should read all event by organizer id and return 200', async () => {

    const response = await request(app)
      .get('/events/1')
      .set('access_token', access_token)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('name', custObj.name);
    expect(response.body).toHaveProperty('imageUrl', custObj.imageUrl);
    expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});

describe('put event', () => {

  it('should change event and return 200', async () => {

    const response = await request(app)
      .put('/events/1')
      .send({
        "name": "Creative Art Society1",
        "location": "Non-Governmental Organization1",
        "startDate": new Date(),
        "imageUrl": "https://static1.squarespace.com/static/61001e71b0a4ce3c2635f669/t/6137632f4e68712eca046a40/1632268825350/CAS+Logo+from+Debbie+R.jpg?format=1500w",
        "description": "+1234567890",
        "endDate": new Date(),
        "registrationDate": new Date(),
        "category": "category",
        "status": "status",
        "benefit": `[{"name": "benefit1"}, {"name": "benefit2"}]`,
        "jobdesk": `[{"name": "jobdesk1"}, {"name": "jobdesk2"}]`,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      })
      .set('access_token', access_token)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toBe(1)
    // expect(response.body).toHaveProperty('id', custObj.id);
    // expect(response.body).toHaveProperty('name', "Creative Art Society1");
    // expect(response.body).toHaveProperty('imageUrl', "Non-Governmental Organization1");
    // expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});

describe('delete event', () => {

  it('should delete event and return 200', async () => {

    const response = await request(app)
      .delete('/events/1')
      .set('access_token', access_token)

    expect(response.status).toBe(200)
    expect(response.body).toBe(1)
    // expect(response.body).toBeInstanceOf(Number);
    // expect(response.body).toHaveProperty('id', custObj.id);
    // expect(response.body).toHaveProperty('name', "Creative Art Society1");
    // expect(response.body).toHaveProperty('imageUrl', "Non-Governmental Organization1");
    // expect(response.body).toHaveProperty('id', expect.any(Number));
  });

});
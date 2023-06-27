const app = require('../../app')
const request = require('supertest');
// const { sequelize } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");

// beforeAll(async () => {
//   await sequelize.queryInterface.bulkInsert('Users', [{
//     username: 'username', password: hashPassword('customer'), email: "user@user.com", gender: "male",
//     birthDate: new Date(), province: "DIY", city: "Jogja", phoneNumber: "12345", jobDesk: "test",
//     isPremium: true,
//     createdAt: new Date(), updatedAt: new Date(),
//   }])
// })

// afterAll(async () => {
//   await sequelize.queryInterface.bulkDelete('Users', null, {
//     truncate: true, restartIdentity: true, cascade: true
//   });
// })

describe('User Login', () => {
  it('should sign in user and return 200', async () => {
    const custObj = { email: 'user@user.com', password: 'customer' }
    const response = await request(app)
      .post('/api/login')
      .send(custObj)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Success to login');
    expect(response.body).toHaveProperty('access_token', expect.any(String));
    expect(response.body).toHaveProperty('id', expect.any(Number));
  });

  it('should not sign in customer when password is not correct and return 401', async () => {
    const custObj = { email: 'user@user.com', password: 'customerzzz' }
    const response = await request(app)
      .post('/api/login')
      .send(custObj)

    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Email / password is incorrect');
  });

  it('should not sign in customer when email is not register and return 401', async () => {
    const custObj = { email: 'customerwrong@test.com', password: 'customer' }
    const response = await request(app)
      .post('/api/login')
      .send(custObj)

    expect(response.status).toBe(401)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Email / password is incorrect');
  });
});
import request from 'supertest';
import app from '../../src/app';
// const User from '../../src/models/User';

describe('CRUD operations', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/user').send({
      nome: 'Paulo Sérgio Rodrigues Leite Junior',
    });
    expect(response.status).toBe(200);

    // const user = await User.create({
    //   nome: 'Paulo Sérgio Rodrigues Leites Junior',
    // });
    // const response = await request(app).post('/user').send({});
  });
});

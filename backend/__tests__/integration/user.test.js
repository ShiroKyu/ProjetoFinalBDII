import request from 'supertest';
import app from '../../src/app';
import User from '../../src/models/User';

// import clearModels from '../utils/clearModels';

describe('CRUD operations', () => {
  // beforeAll(async () => {
  //   await clearModels();
  // });

  it('should create a new user', async () => {
    const response = await request(app).post('/user').send({
      nome: 'Paulo Sérgio Rodrigues Leite Junior',
    });

    expect(response.status).toBe(200);
  });

  it('should list a user by id', async () => {
    const user = await User.create({ nome: 'Tatiana Gutierrez' });

    const { id } = user;

    const response = await request(app).get(`/user/${id}`);

    expect(response.status).toBe(200);
  });
});

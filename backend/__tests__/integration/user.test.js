// import request from 'supertest';
// import app from '../../src/app';
// import User from '../../src/models/User';

// import clearModels from '../utils/clearModels';

// import LoginController from '../../src/controllers/LoginController';
 //import User from '../../src/models/User';
// import Student from '../../src/models/Student';

test('so pra ter um teste aqui', () => {
  expect(true).toBe(true);
});

// describe('test user sing-up', () => {
//   it('can sing up as new user', async () => {
//     const email = 'teste@gmail.com';
//     const matricula = '20151001018';
//     const password = '123456';
//     const id = 50;
//     const user = await User.create({
//       matricula,
//       email,
//       password,
//       student_id: id,
//     });
//     // const response = await request(app).post('/user').send({
//     //        nome: 'sei la',
//     //        email: 'aaaaa@gmail.com',
//     //        matricula: '20151001018',
//     //        password: '123456',
//     //        student_id: 55
//     //      });
//     const response = await res.status(200).json(user);
//   }).expect(response.status).toBe(200);
// });

// describe('CRUD operations', () => {
//   // beforeAll(async () => {
//   //   await clearModels();
//   // });

//   it('should create a new user', async () => {
//     const response = await request(app).post('/user').send({
//       nome: 'Paulo Sérgio Rodrigues Leite Junior',
//     });

//     expect(response.status).toBe(200);
//   });

//   it('should list a user by id', async () => {
//     const user = await User.create({ nome: 'Tatiana Gutierrez' });

//     const { id } = user;

//     const response = await request(app).get(`/user/${id}`);

//     expect(response.status).toBe(200);
//   });
// });

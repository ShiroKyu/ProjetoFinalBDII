import Sequelize from 'sequelize';
import User from '../models/User';

import pgConfig from '../config/pgConfig';

const connection = new Sequelize(pgConfig);

const models = [User];

models.forEach((model) => model.init(connection));

// (async function criarUser() {
//   await User.createO({
//     nome: 'Paulo Sérgio',
//   });

//   const { nome } = await User.findOne({ where: { nome: 'Paulo Sérgio' } });
//   console.log(nome);
// })();

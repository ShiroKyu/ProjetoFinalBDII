import Sequelize from 'sequelize';
import User from '../../models/User';
import Student from '../../models/Student';
import Curso from '../../models/Curso';
import Foto from '../../models/Foto';

import pgConfig from '../../config/pgConfig';

const models = [Curso, Student, User, Foto];

const connection = new Sequelize(pgConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

export default connection;

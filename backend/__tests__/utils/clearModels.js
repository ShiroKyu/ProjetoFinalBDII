import connection from '../../src/database';

module.exports = () => {
  Object.keys(connection.models).map(async (key) => {
    await connection.models[key].destroy({ truncate: true, force: true });
  });
};

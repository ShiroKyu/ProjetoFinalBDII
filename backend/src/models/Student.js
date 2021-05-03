import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        matricula: Sequelize.STRING,
        situacao: Sequelize.STRING,
        municipio: Sequelize.STRING,
        curso_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Curso, {
      foreignKey: 'curso_id',
    });

    this.hasOne(models.User, { foreignKey: 'student_id' });
  }
}

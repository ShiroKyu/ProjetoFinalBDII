import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        matricula: Sequelize.STRING,
        situacao: Sequelize.STRING,
        cota: Sequelize.STRING,
        curso_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Curso, {
      foreignKey: 'curso_id',
      as: 'student_tem_curso',
    });
  }
}

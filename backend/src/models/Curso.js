import Sequelize, { Model } from 'sequelize';

export default class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Student, {
      foreignKey: 'curso_id',
      as: 'curso_tem_aluno',
    });
  }
}

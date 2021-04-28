import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        student_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.beforeSave(async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'user_tem_matricula',
    });

    this.hasMany(models.Foto, { foreignKey: 'user_id' });
  }

  async passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

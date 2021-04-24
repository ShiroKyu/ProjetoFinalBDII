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
        console.log(user.password_hash);
      }
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'user_tem_matricula',
    });
  }

  async passwordIsValid(password) {
    // const a = await bcryptjs.compare(password, this.password_hash);
    // console.log(a, this.password_hash);
    return bcryptjs.compare(password, this.password_hash);
  }
}

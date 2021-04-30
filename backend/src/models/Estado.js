import { Model } from 'sequelize';

export default class Estado extends Model {
  static init(sequelize) {
    super.init({}, { sequelize, tableName: 'estado', timestamps: false });

    return this;
  }
}

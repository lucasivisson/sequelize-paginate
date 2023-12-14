'use strict';
const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     id: DataTypes.INTEGER,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'User',
//     underscored: true
//   });
//   return User;
// };

const User = sequelize.define("Users", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
});

sequelizePaginate.paginate(User)

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = User
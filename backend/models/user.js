const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); 

class User extends Model {}

// Initialisation de la classe User
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  underscored: false
});
// Association du modèle user
User.associate = function(models) {
  User.hasMany(models.Todo, { foreignKey: 'userId' });
};

module.exports = User;



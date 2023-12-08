const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const GroupTodo = require('./groupTodo.js');

class Group extends Model {}

// Initialisation de la classe Group
Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'group',
    timestamps: true,
    underscored: false,
  }
);

// Définition des associations
Group.associate = function (models) {
  Group.belongsToMany(models.Todo, { through: 'GroupTodo', foreignKey: 'groupId' });
  Group.belongsToMany(models.User, { through: 'GroupUser', foreignKey: 'groupId' });
};


module.exports = Group;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const Group = require('./group.js');
const Todo = require('./todo.js');

class GroupTodo extends Model {}

// Initialisation de la classe GroupTodo 
GroupTodo.init(
  {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    todoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'todos',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'groupTodo',
    timestamps: true,
    underscored: false,
  }
);
// Définition des associations entre les modèles.
Group.associate = function (models) {
GroupTodo.belongsTo(models.Todo, { foreignKey: 'todoId' });
GroupTodo.belongsTo(models.Group, { foreignKey: 'groupId' });
}

module.exports = GroupTodo;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const GroupTodo = require('./groupTodo.js');

class Todo extends Model {}

// Initialisation du modèle Todo
Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'à faire' 
    },
    collaborative: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    assignedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups', 
        key: 'id'
      }
    }
  },
  {// Configuration du modèle Todo
    sequelize,
    modelName: 'todo',
    timestamps: true,
    underscored: false,
  }
);
// Association du modèle Todo 
Todo.associate = function (models) {
  Todo.belongsTo(models.User, { foreignKey: 'userId' });
  Todo.belongsTo(models.User, { foreignKey: 'assignedUserId', as: 'assignedTo' });
  Todo.belongsToMany(models.Group, { through: 'GroupTodo', foreignKey: 'todoId' });
};

module.exports = Todo;

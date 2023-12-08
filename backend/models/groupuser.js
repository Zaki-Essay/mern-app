const { Model, DataTypes } = require('sequelize');

class GroupUser extends Model {}

// Initialisation de la classe GroupUser
GroupUser.init({
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Groups', 
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW 
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW 
  }
}, {
  sequelize, 
  modelName: 'GroupUser' 
});

module.exports = GroupUser;

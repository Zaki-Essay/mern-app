const Sequelize = require('sequelize'); // Importation du module Sequelize pour interagir la base de donnée

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  // Options de configuration
  define: {
    timestamps: true, // Active la création automatique des champs 'createdAt' et 'updatedAt' pour chaque modèle
    underscored: false, //utilisation du camelCase pour le nom des colonnes
  },
});

module.exports = sequelize;


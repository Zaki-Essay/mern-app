const cors = require('cors');
const express = require('express');
const sequelize = require('./config/connection'); 
const User = require('./models/user');
const Todo = require('./models/todo');
const Group = require('./models/group');

// Importation des contrôleurs
const authController = require('./controllers/authController');
const todoController = require('./controllers/todoController'); 
const userController = require('./controllers/userController'); 

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes'); 
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
console.log("userRoutes",userRoutes)

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
});

// Définition des routes pour l'API
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes); 
app.use('/api/groups', groupRoutes); 
app.use('/api/users', userRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;

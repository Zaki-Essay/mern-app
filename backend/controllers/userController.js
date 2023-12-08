const User = require('../models/user');

//obtenir la liste des utilisateurs
exports.getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users); 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

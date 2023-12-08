const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Créer un nouvel utilisateur
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    // Créer un token pour le nouvel utilisateur
    const token = jwt.sign({ id: newUser.id }, 'secret_key', { expiresIn: '1h' });

    res.status(201).json({ token: token, userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // Vérifier si l'utilisateur existe
    console.info("nous sommes dans le login")
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Créer un token pour l'utilisateur
    const token = jwt.sign({ id: user.id }, 'secret_key');


    res.json({ token: token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };

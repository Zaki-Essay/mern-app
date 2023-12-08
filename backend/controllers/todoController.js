const { validationResult } = require('express-validator');
const Todo = require('../models/todo');

// Crée une nouvelle todo
exports.createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { task, category, deadline, status, collaborative, userId, groupId, assignedUserId } = req.body;
    const newTodo = await Todo.create({ task, category, deadline, status, collaborative, userId, groupId, assignedUserId });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupère toutes les Todos d'un utilisateur
exports.getTodos = async (req, res) => {
  try {
    console.log("USER", req.user.id)
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Met à jour une todo
exports.updateTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { task, category, deadline, status } = req.body;
    const updatedTodo = await Todo.update({ task, category, deadline, status }, {
      where: { id: req.params.id }
    });

    if (updatedTodo[0] > 0) {
      res.status(200).json({ message: "Todo updated successfully." });
    } else {
      res.status(404).json({ message: "Todo not found." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprime une todo
exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.destroy({
      where: { id: req.params.id }
    });

    if (result > 0) {
      res.status(200).json({ message: "Todo deleted successfully." });
    } else {
      res.status(404).json({ message: "Todo not found." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const { body } = require('express-validator');
const { checkToken } = require('../middlewares/checkToken');
const router = express.Router();

router.post('/', [
  body('task').trim().notEmpty().withMessage('Le champ de la tâche ne doit pas être vide.'),
  body('category').trim().optional().isString().withMessage('La catégorie doit être une chaîne de caractères.'),
  body('deadline').optional().isISO8601().withMessage('La date limite doit être une date valide.'),
  body('status').trim().notEmpty().isIn(['à faire', 'en cours', 'complétée', 'abandonnée']).withMessage('Le statut fourni n\'est pas valide.'),
], createTodo);

router.get('/', checkToken, getTodos);
router.put('/:id', [

], updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;

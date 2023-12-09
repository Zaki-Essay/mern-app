const express = require('express');
const { getGroupTodos, createGroup, getGroups, addMember } = require('../controllers/groupController');
const router = express.Router();

router.post('/', createGroup);
router.get('/', getGroups);
router.post('/addMember', addMember);
router.get('/:groupId/todos', getGroupTodos);
router.delete('/:groupId', deleteGroup); // Add a route for deleting a group


module.exports = router;

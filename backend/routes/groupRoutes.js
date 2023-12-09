const express = require('express');
const { getGroupTodos, createGroup, getGroups, addMember, deleteGroup } = require('../controllers/groupController');
const router = express.Router();

router.post('/', createGroup);
router.get('/', getGroups);
router.post('/addMember', addMember);
router.get('/:groupId/todos', getGroupTodos);
router.delete('/:groupId', deleteGroup);


module.exports = router;

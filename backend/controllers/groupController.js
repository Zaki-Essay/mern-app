const Group = require('../models/group');
const User = require('../models/user');
const Todo = require('../models/todo');
const GroupTodo = require('../models/groupTodo'); 

// Controller pour créer un groupe
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const newGroup = await Group.create({ name });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller pour obtenir tous les groupes
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Controller pour ajouter un membre à un groupe
exports.addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findByPk(groupId);
    console.log(group)
    const user = await User.findByPk(userId)
    console.log(user);

    if (!group || !user) {
      return res.status(404).json({ message: 'Groupe ou utilisateur non trouvé.' });
    }

    await group.addUser(user);

    res.status(200).json({ message: 'Membre ajouté avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Controller pour retirer un membre d'un groupe.
exports.removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(userId);

    if (!group || !user) {
      return res.status(404).json({ message: 'Groupe ou utilisateur non trouvé.' });
    }

    await group.removeUser(user);

    res.status(200).json({ message: 'Membre supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller pour obtenir les tâches d'un groupe
exports.getGroupTodos = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const group = await Group.findByPk(groupId, {
      include: [{ model: Todo, through: GroupTodo }],
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found.' });
    }

    const todos = group.todos || [];  

    console.log(`Todos of the group with ID ${groupId}:`, todos);
    res.json(todos);
  } catch (error) {
    console.error(`Error retrieving todos of the group with ID ${groupId}:`, error);
    res.status(500).json({ error: `Error retrieving todos of the group with ID ${groupId}.` });
  }
};


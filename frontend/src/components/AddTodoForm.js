import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Définition du composant AddTodoForm
const AddTodoForm = ({ onNewTodo }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('à faire');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/groups', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setGroups(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue lors du chargement des groupes.');
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Création d'un nouvel objet todo
    const newTodo = {
      task,
      category,
      deadline,
      status,
      collaborative: true,
      userId: parseInt(localStorage.getItem('userId')),
      assignedUserId: 2,
      groupId: selectedGroup,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/todos', newTodo);
      onNewTodo(response.data);

      // Réinitialisation des états après l'ajout
      setTask('');
      setCategory('');
      setDeadline('');
      setStatus('à faire');
      setSelectedGroup('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  // Rendu du formulaire
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Task:
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} required />
        </label>
        <br />
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <br />
        <label>
          Deadline:
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="complétée">Complétée</option>
            <option value="abandonnée">Abandonnée</option>
          </select>
        </label>
        <br />
        <label>
          Group:
          <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} required>
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddTodoForm;

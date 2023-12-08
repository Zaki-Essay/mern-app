import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Définition du composant AddTodoFormPrivee
const AddTodoFormPrivee = ({ onNewTodo }) => {
    const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('à faire');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  //Charger les données des groupes
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

    

    const newTodo = {
      task,
      category,
      deadline,
      status,
      collaborative: false,
      userId: parseInt(localStorage.getItem('userId')), 
      assignedUserId: parseInt(localStorage.getItem('userId')),
      groupId: null,      
    };

    try {
      const response = await axios.post('http://localhost:3000/api/todos', newTodo);
      onNewTodo(response.data);

      // Réinitialisation des états après l'ajout
      setTask('');
      setCategory('');
      setDeadline('');
      setStatus('à faire');
      setSelectedGroup(null);
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
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddTodoFormPrivee

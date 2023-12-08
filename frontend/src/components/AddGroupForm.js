import React, { useState } from 'react';
import axios from 'axios';

// Définition du composant de formulaire pour ajouter un groupe
export default function AddGroupForm({ onGroupAdded }) {
  // Déclaration des états pour le nom du groupe et les erreurs
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Envoi d'une requête POST pour créer un groupe
      const response = await axios.post('http://localhost:3000/api/groups', {
        name: groupName
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      
      if (onGroupAdded) {
        onGroupAdded(response.data);
      }

      setGroupName(''); 
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la création du groupe.');
    }
  };
// Rendu du formulaire
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="groupName">Nom du groupe:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Créer le groupe</button>
    </form>
  );
}

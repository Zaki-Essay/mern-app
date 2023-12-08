import React, { useState } from 'react';
import axios from 'axios';

// Composant pour ajouter un membre à un groupe 
const AddMembreToGroup = ({ onMemberAdded }) => {
  const [groupId, setGroupId] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  // Fonction appelée lors de l'ajout d'un membre 
  const handleAddMember = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/groups/addMember', { groupId, userId });
      onMemberAdded(response.data);
      setGroupId('');
      setUserId('');
      setError('');
    } catch (error) {
      setError('Erreur lors de l\'ajout du membre au groupe.');
    }
  };
// Rendu du formulaire d'ajout de membre 
  return (
    <div>
      <h3>Ajouter un membre au groupe</h3>
      <div>
        <label htmlFor="groupId">ID du groupe:</label>
        <input
          type="text"
          id="groupId"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userId">ID utilisateur:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <button onClick={handleAddMember}>Ajouter le membre</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddMembreToGroup;

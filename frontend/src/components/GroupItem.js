import React from 'react';
import axios from 'axios';

// Définition du composant GroupItem
export default function GroupItem({ group, onGroupUpdated }) {
  // Fonction pour gérer le fait de rejoindre ou quitter un groupe
  const handleJoinOrLeaveGroup = async (groupId, action) => {
    try {
      const url = `http://localhost:3000/api/groups/${groupId}/${action}`;
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      
      if (onGroupUpdated) {
        onGroupUpdated(groupId, action);
      }
    } catch (err) {
      console.error(`Erreur lors de la tentative de ${action} le groupe`, err);
      
    }
  };


  const handleRemoveGroupe = async (groupId) => {
    try {
      const url = `http://localhost:3000/api/groups/${groupId}`;
      const response = await axios.delete(url, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      
    } catch (err) {
      console.error(`Erreur`, err);
      
    }
  };

  // Détermine si l'utilisateur actuel est membre du groupe
  const isMember = group.members?.some(member => member.id === localStorage.getItem('userId')); 

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
      <span>{group.name}</span>
      <div>
        {isMember ? (
          <button 
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid #555555',
            borderRadius: '4px'
          }}
          
          onClick={() => handleJoinOrLeaveGroup(group.id, 'leave')}>Quitter</button>
        ) : (
          <button 
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid #555555',
            borderRadius: '4px'
          }}

          onClick={() => handleJoinOrLeaveGroup(group.id, 'join')}>Rejoindre</button>
        )}

            <button 
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '2px solid #555555',
              borderRadius: '4px',
              margin: '0 3px 0'
              
            }}
            onClick={() => handleRemoveGroupe(group.id, 'join')}>Remove</button>
      </div>
    </div>
  );
}


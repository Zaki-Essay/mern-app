import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import GroupItem from './GroupItem';

// Définition du composant GroupList
const GroupList = ({ setGroups }) => {
  const [groups, setLocalGroups] = useState([]);
  const [error, setError] = useState('');
  // useEffect est utilisé ici pour charger la liste des groupes dès que le composant apparaît à l'écran.
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/groups', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });


        setLocalGroups(response.data);
        setGroups(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue lors du chargement des groupes.');
      }
    };

    fetchGroups();
  }, [setGroups]);
  // Fonction pour gérer la mise à jour d'un groupe
  const handleGroupUpdated = (groupId, action) => {
    setLocalGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? { ...group, isMember: action === 'join' }
          : group
      )
    );
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <GroupItem
              group={group}
              onGroupUpdated={handleGroupUpdated}
            />
            <h1>{group.id}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;

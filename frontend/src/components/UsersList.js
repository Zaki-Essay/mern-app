import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Définition du composant UserList
export default function UsersList({ setUsers }) {
  const [users, setLocalUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLocalUsers(response.data);
        setUsers(response.data); 
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while loading users.');
      }
    };

  }, [users]);
// Rendu du composant
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

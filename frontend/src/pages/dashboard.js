import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import GroupList from '../components/GroupList';
import AddGroupForm from '../components/AddGroupForm';
import AddMembreToGroup from '../components/AddMembreToGroup';
import Disconnect from '../components/Disconnect';
import UsersList from '@/components/UsersList';

export default function DashboardPage() {
  // États pour les tâches, les groupes et les utilisateurs
  const [todos, setTodos] = useState([]);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTodos(); // Charger les tâches
    fetchGroups(); // Charger les groupes
  }, []);

  // Fonction pour récupérer les tâches
  const fetchTodos = async () => {
    // Logique de récupération des tâches
  };

  // Fonction pour récupérer les groupes
  const fetchGroups = async () => {
    // Logique de récupération des groupes
  };

  // Gestion de l'ajout d'une nouvelle tâche
  const handleNewTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Gestion de l'ajout d'un nouveau groupe
  const handleNewGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  // Gestion de l'ajout d'un nouvel utilisateur
  const handleNewUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <NavBar />
      <div style={{ padding: 10 }}>

        <section>
          <h2>Mes tâches</h2>
          <TodoList todos={todos} setTodos={setTodos} />
        </section>
        <section>
          <h2>Créer un groupe</h2>
          <AddGroupForm onGroupAdded={handleNewGroup} />
        </section>
        <section>
          <h2>Mes groupes</h2>
          <GroupList groups={groups} setGroups={setGroups} />
          <AddMembreToGroup
            onMemberAdded={(message) => console.log(message)}
          />
        </section>
        <section>
          <UsersList users={users} setUsers={handleNewUser} />
        </section>
      </div>

    </div>
  );
}

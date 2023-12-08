import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';

// Définition du composant TodoList
export default function TodoList({ todos, setTodos }) {
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  //charger les todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/todos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTodos(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue lors du chargement des todos.');
      }
    };
    // Appel de la fonction pour charger les todos
    fetchTodos();
  }, [setTodos]);

  // Filtrage des todos
  const filteredTodos = todos.filter(todo => {
    return todo.task?.toLowerCase().includes(searchTerm.toLowerCase());
  });
  // Gestion des clics sur le bouton "Voir"
  const handleViewClick = (todo) => {

    setSelectedTodo(todo);
  };
  // Gestion des clics sur le bouton "Modifier"
  const handleEditClick = (todo) => {

    console.log('Edit todo:', todo);
  };
  // Gestion des clics sur le bouton "Supprimer"
  const handleDeleteClick = async (id) => {
    try {

      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Mise à jour de la liste des todos
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };
  // Rendu du composant
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}


      <Form.Control
        style={{ width: "18rem" }}
        placeholder="Rechercher..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      {searchTerm === '' ? (
        todos.map((todo) => (
          <Card style={{ width: '18rem', display: "inline-block", marginRight: 10, marginTop: 10, marginBottom: 10 }} key={todo.id}>
            <Card.Body>
              <TodoItem todo={todo} />
              <Button variant="secondary" size="sm" style={{ margin: 5 }} onClick={() => handleViewClick(todo)}>Voir</Button>
              <Button variant="secondary" size="sm" style={{ margin: 5 }} onClick={() => handleEditClick(todo)}>Modifier</Button>
              <Button variant="secondary" size="sm" style={{ margin: 5 }} onClick={() => handleDeleteClick(todo.id)}>Supprimer</Button>
            </Card.Body>
          </Card>

        ))
      ) : (
        filteredTodos.map((todo) => (
          <Card style={{ width: '18rem', display: "inline-block", marginRight: 10, marginTop: 10, marginBottom: 10 }} key={"todosearched" + todo.id}>
            <Card.Body>
              <TodoItem todo={todo} />
              <Button variant="secondary" size="sm" style={{ margin: 5 }} onClick={() => handleViewClick(todo)}>Voir</Button>
              <Button variant="secondary" size="sm" style={{ margin: 5 }} onClick={() => handleEditClick(todo)}>Modifier</Button>
              <Button variant="secondary" size="sm" style={{ margin: 5 }} onClick={() => handleDeleteClick(todo.id)}>Supprimer</Button>
            </Card.Body>
          </Card>
        ))
      )}



      {selectedTodo && (
        <div>
          <h3>Informations détaillées</h3>
          <p>Task: {selectedTodo.task}</p>
          <p>Category: {selectedTodo.category}</p>
          <p>Deadline: {selectedTodo.deadline}</p>
          <p>Status: {selectedTodo.status}</p>
        </div>
      )}
    </div>
  );
}

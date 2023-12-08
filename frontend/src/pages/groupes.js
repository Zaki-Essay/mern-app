import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import NavBar from '@/components/NavBar';
import AddTodoForm from '../components/AddTodoForm';
import { Button, Modal } from 'react-bootstrap';

const Groupes = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fonction pour ouvrir la modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Fonction pour fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Gestion de l'ajout d'une nouvelle tâche
  const handleNewTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    closeModal();
  };
  // Gestion des clics sur l'overlay de la modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  // Filtrer les tâches collaboratives
  const collaborativeTodos = todos.filter(todo => todo.collaborative);
  // Rendu du composant
  return (
    <div className="container mt-5"> {/* Utilisation de classes Bootstrap */}
      <NavBar />
      <section>
        <h2>Mes tâches collaboratives</h2>
        <TodoList todos={collaborativeTodos} setTodos={setTodos} />
      </section>
      <Button onClick={openModal}>
        Ajouter une tâche collaborative
      </Button>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodoForm onNewTodo={handleNewTodo} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>

        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default Groupes;

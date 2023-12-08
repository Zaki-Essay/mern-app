import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import NavBar from '@/components/NavBar';
import AddTodoFormPrivee from '../components/AddTodoFormPrivee';
import { Button, Modal } from 'react-bootstrap';

const ToDos = () => {
  const [todos, setTodos] = useState([]); // Gère la liste des tâches
  const [isModalOpen, setIsModalOpen] = useState(false); // Gère la visibilité de la modal
  // Fonction pour ouvrir la modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Fonction pour fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Fonction pour ajouter une nouvelle tâche et fermer la modal
  const handleNewTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    closeModal();
  };
  // Fonction pour gérer le clic sur l'overlay de la modal, permettant de fermer la modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  // Filtrage des tâches pour ne montrer que celles qui ne sont pas collaboratives
  const nonCollaborativeTodos = todos.filter(todo => !todo.collaborative);

  return (
    <div className="container mt-5">
      <NavBar />
      <section>
        <h2>Mes tâches</h2>
        <TodoList todos={nonCollaborativeTodos} setTodos={setTodos} />
      </section>
      <Button onClick={openModal}>
        Ajouter une tâche
      </Button>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodoFormPrivee onNewTodo={handleNewTodo} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>

        </Modal.Footer>
      </Modal>



    </div>
  );
};

export default ToDos;

import React, { useEffect } from 'react';

const TestPage = () => {
  useEffect(() => {
    // Déclaration d'une fonction asynchrone pour tester le backend
    const testBackend = async () => {
      const groupId = 1;
      try {
        // Tentative de requête au backend
        const response = await fetch(`http://localhost:3000/api/groups/${groupId}/todos`);
        const todos = await response.json();
        // Affichage des informations reçues dans la console
        console.log('Todos du groupe avec ID', groupId, ':', todos);
      } catch (error) {
        // Gestion des erreurs et affichage dans la console
        console.error('Erreur lors de la requête vers le backend :', error);
      }
    };
    // Appel de la fonction testBackend
    testBackend();
  }, []);

  return (
    <div>
      <h1>Testing Backend</h1>
    </div>
  );
};

export default TestPage;


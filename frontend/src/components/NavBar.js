import React from 'react';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';



const NavBar = () => {


  // Utilisation du hook useRouter
  const router = useRouter();
  // Définition de la fonction handleLogout qui sera appelée lors du clic sur le bouton
  const handleLogout = () => {
    // Suppression du token de l'utilisateur dans le stockage local (déconnexion)
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirection de l'utilisateur vers la page de connexion
    router.push('/login');
  };

  return (


    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >Tableau de bord</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/todos">Les tâches</Nav.Link>
            <Nav.Link href="/groupes">Les groupes</Nav.Link>
            <Nav.Link onClick={handleLogout}>Se déconnecter</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

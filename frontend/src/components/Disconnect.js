import { useRouter } from 'next/router';

// Définition du composant LogoutButton
const LogoutButton = () => {
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
  // Rendu du bouton de déconnexion
  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
};

export default LogoutButton;


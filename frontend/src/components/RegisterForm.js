import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
      });
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de l’inscription');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#507DBC' }}>
      <Form onSubmit={handleRegister} className="register-form">
        <h2 className="form-title mb-4">Inscription</h2>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nom utilisateur:</Form.Label>
          <Form.Control type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirmez le mot de passe:</Form.Label>
          <Form.Control type="password" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </Form.Group>

        {error && <p className="text-danger text-center">{error}</p>}

        <Button variant="primary" type="submit" className="w-100 custom-button">
          Inscription
        </Button>
      </Form>

      <style jsx>{`
        .register-form {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .form-title {
          color: #333;
          text-align: center;
        }
        .custom-button {
          background-color: #007bff;
          border-color: #007bff;
        }
        .form-control {
          border-radius: 4px;
        }
        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        .text-danger {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}


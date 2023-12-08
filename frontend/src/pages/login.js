import LoginForm from '../components/LoginForm';
import Card from 'react-bootstrap/Card';


export default function LoginPage() {
  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      minHeight: "100vh",
    }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>Bienvenue</Card.Title>
          <LoginForm />

        </Card.Body>
      </Card>
    </div>
  );
}

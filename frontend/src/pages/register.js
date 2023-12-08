import RegisterForm from '../components/RegisterForm';
import Card from 'react-bootstrap/Card';

export default function RegisterPage() {
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
          <RegisterForm />

        </Card.Body>
      </Card>
    </div>
  );
}

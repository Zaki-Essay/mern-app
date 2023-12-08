import axios from 'axios';
import { Badge, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import moment from "moment";
import 'moment/min/locales'
import colors from '@/constants/colors';
moment.locale('fr')



export default function TodoItem({ todo }) {
  // Envoie une requête pour mettre à jour le statut de la tâche en base de données.
  const handleComplete = async () => {
    try {
      // Envoie une requête PUT pour mettre à jour le statut de la tâche comme "complétée"
      await axios.put(`http://localhost:3000/api/todos/${todo.id}`, {
        ...todo,
        status: 'complétée'
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });


    } catch (err) {

      console.error('Erreur lors de la mise à jour de la tâche', err);
    }
  };
  // Rendu du composant

  // comparaison des dates pour savoir si la todo est en retard
  let nowDate = new Date().getTime();
  let todoDate = new Date(todo.deadline).getTime();


  return (
    <>


      <Card.Title>
        <span style={{ textDecoration: todo.status === 'complétée' ? "line-through" : null }}>{todo.task}</span>
        {nowDate > todoDate && todo.status !== 'complétée' ? <span style={{ color: "red", float: "right" }}>en retard</span> : null}
      </Card.Title>

      <Card.Text>
        <p style={{ color: colors.blackLight }}>Deadline : {moment(todo.deadline).format('dddd DD MMMM')}</p>
        <p style={{ color: colors.blackLight }}>Statut : <Badge bg="primary">{todo.status}</Badge></p>
      </Card.Text>
      {todo.status !== 'complétée' ? <Button size="sm" style={{ margin: 5 }} variant="success" onClick={handleComplete}>Compléter</Button> : null}
      <br />

    </>


  );
}

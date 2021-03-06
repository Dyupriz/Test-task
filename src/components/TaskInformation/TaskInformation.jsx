import { useContext } from 'react';
import { context } from '../../context';
import { Link } from 'react-router-dom';

function TaskInformation() {
  const { taksInfo } = useContext(context);
  const dateProcessing = (date) => new Date(date).toLocaleDateString();

  return (
    <div className='contaiber mx-5 my-5'>
      <ul className="list-group">
        <li className="list-group-item">{taksInfo.id}</li>
        <li className="list-group-item">{taksInfo.status}</li>
        <li className="list-group-item">{taksInfo.order_type.name}</li>
        <li className="list-group-item">{taksInfo.terminal.name}</li>
        <li className="list-group-item">{taksInfo.account.name}</li>
        <li className="list-group-item">{taksInfo.created_user.surname}</li>
        <li className="list-group-item">{taksInfo.created_user.name}</li>
        <li className="list-group-item">{taksInfo.created_user.patronymic}</li>
        <li className="list-group-item">{dateProcessing(taksInfo.created_date)}</li>
      </ul>
      <Link to="/" className='btn btn-primary my-3 mx-3' aria-current="page">Назад</Link> <br />
    </div>
  )
}

export default TaskInformation;

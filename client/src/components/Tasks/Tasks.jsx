import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { context } from '../../context';
import style from './Task.scss';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);
  const dateProcessing = (date) => new Date(date).toLocaleDateString();
  const { taksInfo, setTaskInfo } = useContext(context);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      const res = await axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f15021c-fcd4-4657-aff4-2782f62b60b6/test_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220707T070817Z&X-Amz-Expires=86400&X-Amz-Signature=e5ef210b824d9db368233d1017e6a2cba94ad5fab26c79997b9a04f7e082857b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22test_data.json%22&x-id=GetObject');
      setTasks(res.data);
      setLoading(false);
    }
    getTasks();
  }, [])

  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
  const curresntTask = tasks.slice(firstTaskIndex, lastTaskIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = (num) => {
    if (currentPage <= 1 || (currentPage <= 3 && num === 3)) {
      setCurrentPage(prev => prev + (tasks.length / tasksPerPage) - num);
    } else {
      setCurrentPage(prev => prev - num);
    }
  };

  const nextPage = (num) => {
    if (currentPage >= (tasks.length / tasksPerPage) || (currentPage >= (tasks.length / tasksPerPage) - 2 && num === 3)) {
      setCurrentPage(prev => prev - (tasks.length / tasksPerPage) + num);
    } else {
      setCurrentPage(prev => prev + num);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="container mt-5">

      <div className="row columns fw-bold">
        <div className="col-2 my-2 ps-0 text">
          Название / Дата
        </div>
        <div className="col-4 my-2 ps-0 text">
          Тип задания / Автор
        </div>
        <div className="col-3 my-2 ps-0 text">
          Аккаунт / Терминал
        </div>
        <div className="col my-2 ms-5 ps-5 text-center text">
          Статус
        </div>
      </div>

      {curresntTask.map((task) => (
        <Link to="/taskInformation" onClick={() => setTaskInfo(task)} key={task.id} className="nav-link" >
          <div className="row align-items-start text">
            <div className="col text text">
              {task.id}<br />
              {dateProcessing(task.created_date)}
            </div>
            <div className="col-4 text">
              {task.order_type.name}<br />
              {task.created_user.surname} {task.created_user.name.substr(0, 1)}.{task.created_user.patronymic.substr(0, 1)}.
            </div>
            <div className="col-4 text">
              {task.account.name} <br />
              {task.terminal.name}
            </div>
            {task.status === 'new' &&
              <div className="col status text" style={{ backgroundColor: "Crimson" }}>
                Новый
              </div>
            }
            {task.status === 'completed' &&
              <div className="col status text" style={{ backgroundColor: "Green" }}>
                Завершённый
              </div>
            }
            {task.status === 'started' &&
              <div className="col status text" style={{ backgroundColor: "gold" }}>
                Начатый
              </div>
            }
            {task.status === 'declined' &&
              <div className="col status text" style={{ backgroundColor: "Gray" }}>
                Отклонено
              </div>
            }
            {task.status === 'assigned_to' &&
              <div className="col status text" style={{ backgroundColor: "gold" }}>
                Присвоен
              </div>
            }

          </div>
        </Link>
      ))}
      <div className='containerButton'>
        <p>Записи 1-{tasks.length / tasksPerPage}</p>
        <button className='btn btn-outline-success' onClick={() => prevPage(1)}>&lt;</button>
        <button className='btn btn-outline-success' onClick={() => prevPage(3)}>&lt;&lt;</button>
        <p className='count'>{currentPage}</p>
        <button className='btn btn-outline-success' onClick={() => nextPage(1)}>&gt;</button>
        <button className='btn btn-outline-success' onClick={() => nextPage(3)}>&gt;&gt;</button>
        <p>По</p>
        <Pagination tasksPerPage={tasksPerPage} totalTasks={tasks.length} paginate={paginate} currentPage={currentPage} />
        <p>записей</p>
      </div>

    </div>
  );
}

export default Tasks;

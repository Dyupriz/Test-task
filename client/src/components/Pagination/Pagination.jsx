import React from 'react';
import style from './Pagination.scss';

function Pagination({ tasksPerPage, totalTasks, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= (totalTasks / tasksPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="btn-group">
      <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {currentPage}
      </button>
      <ul className="btn dropdown-menu ul">
        {
          pageNumbers.map((number) => (
            <li className="dropdown-item" key={number} onClick={() => paginate(number)}>
                {number}
            </li>
          ))
        }
      </ul>
    </div>



  )
}

export default Pagination;

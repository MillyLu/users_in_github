import styles from './index.module.css';
import { useState } from 'react';

export function Pagination ({ usersPerPage, totalUsers, paginate }) {
    console.log(totalUsers);

    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(7);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [pageNumberLimit] = useState(7); //setPageNumberLimit //
    const [currentPage, setCurrentPage] = useState(1);
    
    const pages = [];

    for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pages.push(i)
    }
///
    const onHandleClick = (e) => {
        setCurrentPage(Number(e.target.id));

    }

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              id={number}
              onClick={(e) => {onHandleClick(e); paginate(number)}}
              className={currentPage === number ? "active" : styles.pagination_item}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
      });

      const onHandleNextbtn = () => {
        setCurrentPage(currentPage + 1);
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      };
    
      const onHandlePrevbtn = () => {
        setCurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      };

      let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={onHandleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={onHandlePrevbtn}> &hellip; </li>;
  }



////

    return(
        <div className={styles.pagination}>
            <ul className={styles.pagination_list}>
               
            <li>
          <button
            className={styles.pagination_button}
            onClick={onHandlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Предыдущая
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button className={styles.pagination_button}
            onClick={onHandleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Следующая
          </button>
        </li>
            </ul>
        </div>
    )

}
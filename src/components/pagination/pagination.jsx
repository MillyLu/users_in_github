import styles from './index.module.css';
import { useCallback, useState } from 'react';

export function Pagination ({ usersPerPage, totalUsers, paginate }) {


    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(7);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [pageNumberLimit] = useState(7); //setPageNumberLimit //
    const [currentPage, setCurrentPage] = useState(1);
    
    const pages = [];

    for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pages.push(i)
    }

    const onHandleClick = useCallback((e) => {
        setCurrentPage(Number(e.target.id));

    },[setCurrentPage]);

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

      const onHandleNextButton = useCallback(() => {
        setCurrentPage(currentPage + 1);
        paginate(currentPage+1)
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      },[currentPage, maxPageNumberLimit, minPageNumberLimit, pageNumberLimit, paginate]);
    
      const onHandlePrevButton = useCallback(() => {
        setCurrentPage(currentPage - 1);
        paginate(currentPage-1)
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      }, [currentPage, maxPageNumberLimit, minPageNumberLimit, pageNumberLimit, paginate]);

      let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={onHandleNextButton}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={onHandlePrevButton}> &hellip; </li>;
  }



  return(
        <div className={styles.pagination}>
            <ul className={styles.pagination_list}>
               
            <li>
          <button
            className={styles.pagination_button}
            onClick={onHandlePrevButton}
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
            onClick={onHandleNextButton}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Следующая
          </button>
        </li>
            </ul>
        </div>
    )

}
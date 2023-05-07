import { useState, useEffect } from 'react';
import styles from './index.module.css';
import axios from "axios";
import { Title } from '../components/title/title';
import { Search } from '../components/search/search';
import { UserList } from '../components/userList/userList';
import { Pagination } from '../components/pagination/pagination';
import { FilterButton } from '../components/filter/filterButton';

export function Main() {

  const [login, setLogin] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState('')
  const [usersPerPage] = useState(12);
  const [sort, setSort] = useState('desc')

 useEffect(() => {
    const getUserByLogin = async () => {

      const response = await axios.get(`https://api.github.com/search/users?q=${login}&per_page=${usersPerPage}&page=${currentPage}&sort=repositories&order=${sort}`);
      console.log(response.data);
      setLoading(true);
      setUsers(response.data.items);
      setTotalUsers(response.data.total_count <= 1000 ? response.data.total_count : 1000)
      setLoading(false)
    }
    if(login === '') {
      return;
    }
    getUserByLogin();
  }, [login, currentPage, usersPerPage, sort]);
  
  const paginate = page => setCurrentPage(page);



  return (
    <div className={styles.main}>
        <Title />
        <Search setLogin={setLogin}/>
        {loading && <span className={styles.loader}></span>}
        {users?.length>=1 && 
        <div>
          <FilterButton setSort={setSort}/>
          
        <UserList data={users}/>
        <Pagination usersPerPage={usersPerPage} totalUsers={totalUsers} paginate={paginate}/>
        </div>
        }
      
    </div>

  );
}


import styles from './index.module.css';
import { UserItem } from '../userItem/userItem';

export function UserList ({data}) {

    console.log(data);
    return(
        <div>
            <h2 className={styles.title}>Результаты поиска:</h2>
        {(data) && (
            data?.map((item) => (
            <UserItem key={item.id} login={item.login} avatar={item.avatar_url} link={item.html_url} />
        )) )}
        
        </div>
        
    
    )
}

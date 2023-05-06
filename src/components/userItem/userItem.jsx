import { useState, useCallback } from 'react';
import axios from "axios";
import styles from './index.module.css';


export function UserItem(props) {

    const [extra, setExtra] = useState(false);
    const [repoNumbers, setRepoNumbers] = useState('');
    const [followers, setFollowers] = useState('');

    console.log(props.pub);

    const getUserRepos = useCallback( async() =>  {
    console.log(props.login);
        const response = await axios.get(`https://api.github.com/users/${props.login}`);
        console.log(response.data);
        setRepoNumbers(response.data.public_repos);
      }, [props.login]);

      const getUserFollowers = useCallback( async() => {
    
        const response = await axios.get(`https://api.github.com/users/${props.login}`);
        console.log(response.data);
        setFollowers(response.data.followers);
      }, [props.login]); 

    const onHandleClick = useCallback(() => {
        getUserRepos();
        getUserFollowers();
        if (extra === true) {
            setExtra(false);
            return
        }
        setExtra(true);
    }, [extra, getUserFollowers, getUserRepos]) 



    return(
        <div className={styles.user}>
           <h3 className={styles.user__title} onClick={onHandleClick}>{props.login}</h3>
        { extra === true && 
        <div className={styles.user__extra}>
            <img className={styles.user__extra_img} src={props.avatar} alt='pic'/>
            <a className={styles.user__extra_link} href={props.link}>Ссылка на GITHUB {props.login}</a>          
            <p className={styles.user__extra_repo}>Количество репозиториев - {repoNumbers}</p>
            <p className={styles.user__extra_followers}>Количество подписчиков - {followers}</p>
        </div>
        
        
        }
        </div>
        
    )
}
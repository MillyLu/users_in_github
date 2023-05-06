import styles from './index.module.css';
import { useState } from 'react';


export function Search ({setLogin}) {

    const [name, setName] = useState('')

    function onHandleChange(e) {
        setName('')
        setName(e.target.value)
    }


    const onHandleSubmit = (e) => {
        e.preventDefault();

        setLogin(name);
  


    }


    return(
        <form  data-testid="form" className={styles.form} onSubmit={onHandleSubmit}>
            <input data-testid="input" className={styles.field} type='search' name='login' placeholder='Введите логин...' onChange={(e) => onHandleChange(e)}/>
            <button data-testid="button" className={styles.button} type='submit' />

        </form>
        
    )
}
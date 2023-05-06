import styles from './index.module.css';


export function FilterButton ({setSort}) {

    function onHandleChange (e) {
        setSort(e.target.value)
    }

    return(
        <div className={styles.filter}>
            <h3 className={styles.filter_title}>Отсортировать по количеству репозиториев:</h3>
            <input
                className={styles.filter_radio}
                type='radio'
                name='sort'
                value='desc'
                id='desc'
                defaultChecked
                onChange={onHandleChange}
            />
            <label className={styles.filter_label1} htmlFor="desc">От большего к меньшему</label>    
            <input
                className={styles.filter_radio}
                type='radio'
                name='sort'
                value='asc'
                id='asc'
                onChange={onHandleChange}
            />
            <label className={styles.filter_label} htmlFor='asc'>От меньшего к большему</label>    
        </div>

    )
}
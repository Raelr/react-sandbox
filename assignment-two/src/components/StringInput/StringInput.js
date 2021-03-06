import React from 'react'
import styles from './StringInput.module.css'

const stringInput = (props) => {
    return (
        <div >
            <textarea className={styles.StrInput} type='text' onChange={(event) => props.stringEntered(event)} value={props.input}></textarea>
            <p><b>Length:</b> {props.length}</p>
        </div>
    );
}

export default React.memo(stringInput);
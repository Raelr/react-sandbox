import React from 'react';
import styles from './Validation.module.css'

const validation = (props) => {
    const isTooShort = (
        props.length < 5
    );

    let style = [];
    let message = '';

    if (isTooShort) {
        message = 'Text too short!'
        style.push(styles.red);
    } else {
        message = 'Text is long enough!'
        style.push(styles.green);
    }

    return (
        <div>
            <p className={style.join(' ')}><b>{message}</b></p>
        </div>
    );
}

export default validation;
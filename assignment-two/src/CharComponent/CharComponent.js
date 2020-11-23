import React from 'react';
import styles from './CharComponent.module.css'

const charComponent = (props) => {

    return (
        <div className={styles.CharComponent} onClick={props.click}>
            <p>
                {props.char}
            </p>
        </div>
    );
}

export default charComponent;
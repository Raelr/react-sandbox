import React from 'react';
import './Validation.css'

const validation = (props) => {
    const isTooShort = (
        props.length < 5
    );

    const message = isTooShort ? 'Text too short!' : 'Text is long enough!';

    return (
        <div>
            <p>{message}</p>
        </div>
    );
}

export default validation;
import React from 'react';
import './Validation.css'

const validation = (props) => {
    console.log(props)
    const isTooShort = (
        props.length < 5
    );

    console.log(props.length)

    const message = isTooShort ? 'Text too short!' : 'Text is long enough!';

    return (
        <div>
            <p>{message}</p>
        </div>
    );
}

export default validation;
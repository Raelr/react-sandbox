import React from 'react';
import './CharComponent.css'

const style = {
    display:    'inline-block',
    padding:    '16px',
    textAlign:  'center',
    margin:     '16px',
    border:     '1px solid black'
};

const charComponent = (props) => {
    return (
        <div style={style}>
            <p>
                {props.char}
            </p>
        </div>
    );
}

export default charComponent;
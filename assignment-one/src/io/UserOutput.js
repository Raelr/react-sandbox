import React from 'react'

const UserOutput = (props) => {

    const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid #eee',
        width: '200px',
        margin: '10px auto',
        padding: '10px',
        boxShadow: '0 2px 3px #ccc'
    };

    return (
        <div style={style}>
            <p>Your Username is:</p>
            <p>{props.name}</p>
        </div>
    );
}

export default UserOutput;
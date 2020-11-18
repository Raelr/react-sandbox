import React from 'react'
import './UserInput.css'

const UserInput = (props) => {
    return (
        <div className="UserInputSection">
            <input className="UserInput" type="text" onChange={props.changed} 
            value={props.name}></input>
        </div>
    );
}

export default UserInput;
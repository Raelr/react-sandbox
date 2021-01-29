import React from 'react'
import Button from '../../UI/Button/Button'

const loginUser = (props) => (
    <form>
        <label for='username'>Username:</label>
        <br/>
        <input type='text' id='username' name='username'></input><br/>
        <label for='password'>Password:</label>
        <br/>
        <input type='password' id='password' name='password'></input>
        <br/>
        <Button>
            Login
        </Button>
    </form>
);

export default loginUser;
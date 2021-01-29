import React from 'react'
import classes from './Login.module.css'
import LoginUser from './LoginUser/LoginUser'

const login = (props) => (
    <div className={classes.Login}>
        <h1>LOGIN PAGE</h1>
        <LoginUser />
    </div>
);

export default login;
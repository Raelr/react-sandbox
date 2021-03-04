import React, { useState } from 'react'
import classes from './Login.module.css'
import LoginUser from './LoginUser/LoginUser'
import axios from '../../axios-users'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

const Login = (props) => {

    const [userInfo, setUserInfo] = useState({username: "", password: ""})

    const loginUserHandler = (event) => {
        event.preventDefault()

        bcrypt.hash(userInfo.password, salt, (err, hash) => {

            axios.get('http://localhost:8080/app/users/authentication?username='+userInfo.username+'&password='+hash)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

            console.log(hash)
        })
    }

    const userNameUpdateHandler = (event) => {
        let input = event.target.value
        setUserInfo({username: input, password: userInfo.password})
    }

    const passwordUpdateHander = (event) => {
        let input = event.target.value
        setUserInfo({username: userInfo.username, password: input})
    }

    return (
        <div className={classes.Login}>
        <h1>LOGIN PAGE</h1>
        <LoginUser 
            loginHandler={loginUserHandler}
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHander}    
        />
        </div>
    );
};

export default Login;
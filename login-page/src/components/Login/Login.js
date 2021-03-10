import React, { useState } from 'react'
import classes from './Login.module.css'
import LoginUser from './LoginUser/LoginUser'
import axios from '../../axios-users'

const Login = () => {

    const [userInfo, setUserInfo] = useState({username: "", password: ""})
    const [isRegisteringUser, setIsRegisteringUser] = useState(false)

    const loginUserHandler = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: '/app/users/authentication',
            baseURL: 'http://localhost:8080',
            data: {
                username: userInfo.username,
                password: userInfo.password
            },
        }).then((response) => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        });
    }

    const userNameUpdateHandler = (event) => {
        let input = event.target.value
        setUserInfo({username: input, password: userInfo.password})
    }

    const passwordUpdateHander = (event) => {
        let input = event.target.value
        setUserInfo({username: userInfo.username, password: input})
    }

    const registerUserHandler = () => {
        setIsRegisteringUser(!isRegisteringUser)
    }

    let login = <LoginUser 
            loginHandler={loginUserHandler} 
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHander}
        />
    
    let loginMessage = 'Don\'t have an account? Register ';

    if (isRegisteringUser) {
        login = <p>Register User</p>
        loginMessage = 'Already have an account? Login '
    }

    return (
        <div className={classes.Login}>
            <h1>LOGIN PAGE</h1>
            {login}
            <div className={classes.RegisterDiv}>
                <p>
                    {loginMessage} 
                    <span className={classes.RegisterLink} onClick={registerUserHandler}>
                        Here!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react'
import classes from './Login.module.css'
import LoginUser from './LoginUser/LoginUser'
import LoginRegisterUser from './LoginRegisterUser/LoginRegisterUser'
import axios from '../../axios-users'

const Login = () => {

    const [userInfo, setUserInfo] = useState({username: "",password: ""})
    const [isRegisteringUser, setIsRegisteringUser] = useState(false)
    const [isMatchingPasswords, setIsMatchingPasswords] = useState(false)

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

    const registerUserhander = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: '/app/users/register',
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

    const passwordUpdateHandler = (event) => {
        let input = event.target.value
        setUserInfo({username: userInfo.username, password: input})
    }

    const confirmPasswordUpdateHandler = (event) => {
        let input = event.target.value
        setIsMatchingPasswords((input === userInfo.password) || (input.length > 0 && userInfo.password.length > 0))
    }

    const selectRegisterUserHandler = () => {
        setIsRegisteringUser(!isRegisteringUser)
        setUserInfo({username: "", password: ""})
    }

    let login = <LoginUser 
            loginHandler={loginUserHandler} 
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHandler}
        />
    
    let loginMessage = 'Don\'t have an account? Register ';

    if (isRegisteringUser) {
        login = <LoginRegisterUser
            registerHandler={registerUserhander}
            updateUsernameHandler={userNameUpdateHandler}
            passwordUpdateHandler={passwordUpdateHandler}
            confirmPasswordUpdateHandler={confirmPasswordUpdateHandler}
            isDisabled={(!isMatchingPasswords || !userInfo.username.length > 0)}
        />
        loginMessage = 'Already have an account? Login '
    }

    return (
        <div className={isRegisteringUser ? [classes.Login,classes['Register']].join(' ') : classes.Login}>
            <h1>{isRegisteringUser ? 'REGISTER USER' : 'LOGIN PAGE'}</h1>
            {login}
            <div className={classes.RegisterDiv}>
                <p>
                    {loginMessage} 
                    <span className={classes.RegisterLink} onClick={selectRegisterUserHandler}>
                        Here!
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
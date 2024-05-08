import React, {useState} from 'react';
import {SERVER_URL} from "./constant";
import LoginForm from "./LoginComponents/LoginForm";
import RegisterForm from "./LoginComponents/RegisterForm";


const Login = () => {
    const handleOAuthLogin = (provider) => {
        window.location.href = SERVER_URL + `/oauth2/authorization/${provider}`;
    };

    return (
        <div>

            <div><h1>Welcome to NutriGenius</h1></div>

            <LoginForm/>

            <RegisterForm/>

            <div>
                <button onClick={() => handleOAuthLogin('google')}>Login with Google</button>
                <button onClick={() => handleOAuthLogin('github')}>Login with GitHub</button>
            </div>

        </div>
    );
};

export default Login;

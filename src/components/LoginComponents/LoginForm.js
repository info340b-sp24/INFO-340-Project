import React, {useState} from 'react';
import axios, {request} from "axios";
import {FrontEnd_URL, SERVER_URL} from "../constant";

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const data = {
        email: email,
        password: password
    }

    const handleSubmit = (event, email, password) => {
        event.preventDefault();

        axios.post(
            SERVER_URL + "/api/auth/formLogin",data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                console.log('Token stored:', response.data.token);
                setIsLoggedIn(true);

            })
            .catch((error) => {
                setError('Login failed. Please try again.');
                console.error('Login failed:', error);
            })
    };



    return (
        <div>

            <div>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

        </div>
    );
};

export default LoginForm;
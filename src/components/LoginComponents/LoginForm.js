import React, {useState} from 'react';
import axios, {request} from "axios";
import {SERVER_URL} from "../constant";

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (event, email, password) => {
        event.preventDefault();

        axios.post(
            SERVER_URL + "/auth/formLogin",
            {login: email, password: password}
            )
            .then((response) => {
                window.localStorage.setItem("auth_token", response.data.token)
            console.log(response); // handle the response as needed
            setIsLoggedIn(true);
            })
            .catch((error) => {
                setError('Login failed. Please try again.');
                console.error('Login failed:', error);
            })
    };

    console.log(email);

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
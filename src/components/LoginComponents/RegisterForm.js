import React, { useState } from 'react';
import axios, {request} from "axios";
import {SERVER_URL} from "../constant"

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistered, setisRegistered] = useState(false);

    const handleSubmit = (event, name, email, password) => {
        event.preventDefault();

        axios.post(
            SERVER_URL + "/auth/formRegister",
            {name: name, login: email, password: password}
        )
            .then((response) => {
                window.localStorage.setItem("auth_token", response.data.token)
                console.log(response); // handle the response as needed
                setisRegistered(true);
        })
            .catch((error) => {
                console.error('Register failed:', error);
                setError('Register failed. Please try again.');
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
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
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;
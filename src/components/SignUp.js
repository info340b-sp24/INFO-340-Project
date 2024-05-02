import React, { useState } from 'react';
import LoginWithGoogle from "./LoginWithGoogle";
import "../CSS/SignUp.css"
import axios from 'axios';

function SignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/api/v1/auth/register', { firstname, lastname, email, password})
            .then(response => {
                console.log('User registered:', response.data);
            })
            .catch(error => {
                console.error('Registration error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="signupForm">
            <label>
                firstname:
                <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                lastname:
                <input type="text" value={lastname} onChange={e => setLastname(e.target.value)}/>
            </label>
            <label>
                email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <button type="submit">Sign up</button>
            <LoginWithGoogle />
        </form>
    );

}

export default SignUp;
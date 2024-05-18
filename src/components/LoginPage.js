import React, { useState } from 'react';
import '../CSS/Login.css';
import LoginBoxImage from '../Data/Image/LoginBoxBackground.png'

const LoginPage = ({ users }) => {

    console.log(localStorage.getItem('currentUser'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(u => u.Email === email && u.Password === password);
        if (user && user.userId !== null) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setError('');
            window.location.href = '/';
        } else {
            setError('Invalid email or password');
        }
    };


    //you need to login before allowed to go to other pages, login info can be found in users.json
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h2>welcome to</h2>
                    <h1>NutriGenius</h1>
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Username, or email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Username, or email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    {error && <p className="login-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
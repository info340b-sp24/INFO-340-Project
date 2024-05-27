import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase-config';

const UserProfileAuth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, setUser); // Listen for user state changes
    }, [auth]);

    const handleUserData = (userId, email) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            email: email,
            lastLogin: Date.now()
        })
            .then(() => {
                console.log("Data saved successfully!");

            })
            .catch((error) => {
                console.error("Failed to save data:", error);
            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                console.log('User logged out');
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    setUser(userCredential.user);
                    handleUserData(userCredential.user.uid, userCredential.user.email);
                })
                .catch(setError);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    setUser(userCredential.user);
                    handleUserData(userCredential.user.uid, userCredential.user.email);
                })
                .catch(setError);
        }
    };

    if (user) {
        return (
            <div>
                <h1>Profile Page</h1>
                <p>Welcome, {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit}>
                <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
                <button type="button" onClick={() => setIsSignUp(!isSignUp)}>Switch to {isSignUp ? 'Log In' : 'Sign Up'}</button>
                {error && <p className="error">{error.message}</p>}
            </form>
        </div>
    );
};

export default UserProfileAuth;
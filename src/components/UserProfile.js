import React from 'react';
import Cookie from 'js-cookie'
import {SERVER_URL} from "./constant";

const UserProfile = ({ redirectUri }) => {

    console.log("Retrieved id_token:", Cookie.get('id_token'));
    console.log("Retrieved access_token:", Cookie.get('access_token'));

    const handleLogout = async() => {
        try {
            const response = await fetch(
                SERVER_URL + '/logout', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    credentials: 'include'
                }
            );
            if (response.ok) {
                window.location.href = '/';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our UserPage</h1>
            <p>This is a simple UserPage component in React.</p>
            <button onClick={handleLogout} style={{ fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
    );
};

export default UserProfile;

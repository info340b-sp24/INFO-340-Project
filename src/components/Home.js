import React, {useEffect, useState} from 'react';
import {SERVER_URL} from "./constant";

const HomePage = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetch(
            SERVER_URL + '/user/me',
            {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);
    const handleRedirect = () => {
        window.location.href = 'http://localhost:3000/userProfile';
    };

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Welcome to Our Homepage</h1>
            <p><strong>Mr.</strong> {userData.name}</p>
            <p>This is a simple homepage component in React.</p>
            <button onClick={handleRedirect} style={{fontSize: '16px', padding: '10px 20px', cursor: 'pointer'}}>
                userprofile
            </button>
        </div>
    );
};

export default HomePage;

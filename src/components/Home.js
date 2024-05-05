import React from 'react';

const HomePage = ({ onLogout }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our Homepage</h1>
            <p>This is a simple homepage component in React.</p>
            <button onClick={onLogout} style={{ fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
    );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ProfilePage.css'; // Ensure you create this CSS file

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/Login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/Login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profile-info">
                <div className="profile-img"><img src={user.userImg} alt="Profile"/></div>
                <div className="profile-details">
                    <p><strong>Username:</strong> {user.userName}</p>
                    <p><strong>Email:</strong> {user.Email}</p>
                </div>
                <div className="edit-icon">✏️</div>
            </div>
            <h2>Saved Posts</h2>
            <div className="saved-posts">
                <div className="post-container">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <h2>Saved Quizzes</h2>
            <div className="saved-quizzes">
                <div className="quiz-container">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Log out</button>
            <div className="delete-account">Delete Account</div>
        </div>
    );
};

export default ProfilePage;
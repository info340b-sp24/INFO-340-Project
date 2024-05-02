import React from "react";
import "../CSS/SignUp.css"

function generateRandomString(length = 32) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
function LoginWithGoogle() {
    const handleLogin = () => {
        const state = generateRandomString();
        localStorage.setItem('oauthState', state);
        const clientId = '475100233752-sifkebkld7qvrbcavb0871a0ejak83pu.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:8081/oauth2/callback';
        const responseType = 'code';
        const scope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&state=${state}`; // Redirect the user to the Google login page
    };

    return (
        <button onClick={handleLogin} className="googleLoginInButton">Login with Google</button>
    );
}

export default LoginWithGoogle;
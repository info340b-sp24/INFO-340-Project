import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, set, remove, onValue, update } from 'firebase/database';

const UserProfileAuth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [meals, setMeals] = useState([]);
    const [calorieGoal, setCalorieGoal] = useState(null);
    const [newCalorieGoal, setNewCalorieGoal] = useState('');

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                fetchUserData(user.uid);
                fetchMeals(user.uid);
            }
        });
    }, [auth]);

    const handleUserData = (userId, email) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            email: email,
            lastLogin: Date.now(),
            calorieGoal: 0
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

    const fetchUserData = (userId) => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCalorieGoal(data.calorieGoal);
            }
        });
    };

    const fetchMeals = (userId) => {
        const db = getDatabase();
        const mealsRef = ref(db, 'users/' + userId + '/meals');
        onValue(mealsRef, (snapshot) => {
            const data = snapshot.val();
            setMeals(data ? Object.entries(data) : []);
        });
    };

    const handleDeleteMeal = (mealId) => {
        const db = getDatabase();
        const mealRef = ref(db, `users/${user.uid}/meals/${mealId}`);
        remove(mealRef)
            .then(() => {
                setMeals(prevMeals => prevMeals.filter(([id]) => id !== mealId));
            })
            .catch((error) => {
                console.error('Error deleting meal:', error);
            });
    };

    const handleUpdateCalorieGoal = () => {
        const db = getDatabase();
        const userId = user.uid;
        update(ref(db, 'users/' + userId), { calorieGoal: newCalorieGoal })
            .then(() => {
                setCalorieGoal(newCalorieGoal);
                setNewCalorieGoal('');
                console.log('Calorie goal updated successfully.');
            })
            .catch((error) => {
                console.error('Error updating calorie goal:', error);
            });
    };

    const renderedMeals = meals.map(([mealId, meal]) => (
        <div key={mealId} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>{meal.name}</h3>
            <p>Foods:</p>
            <ul>
                {meal.foods.map((food, index) => (
                    <li key={index}>
                        <div>{food.key}</div>
                        <div>Calories: {food.Calories} | Carbs: {food.Carbs}g | Fat: {food.Fat}g | Fiber: {food.Fiber}g | Protein: {food.Protein}g</div>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleDeleteMeal(mealId)}>Delete Meal</button>
        </div>
    ));

    if (user) {
        return (
            <div>
                <h1>Profile Page</h1>
                <p>Welcome, {user.email}</p>
                <p>Your daily Calorie goal is: {calorieGoal}</p>
                <input
                    type="number"
                    value={newCalorieGoal}
                    onChange={e => setNewCalorieGoal(e.target.value)}
                    placeholder="Set new calorie goal"
                />
                <button onClick={handleUpdateCalorieGoal}>Update Calorie Goal</button>
                <button onClick={handleLogout}>Logout</button>
                <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                    {renderedMeals}
                </div>
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
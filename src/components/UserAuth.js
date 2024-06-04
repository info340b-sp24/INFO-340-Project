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
    const [nutritionalGoals, setNutritionalGoals] = useState({});
    const [newValue, setNewValue] = useState('');
    const [selectedNutrient, setSelectedNutrient] = useState('calories');

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
            nutritionalGoals: { calories: 0 }
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
            if (data && data.nutritionalGoals) {
                setNutritionalGoals(data.nutritionalGoals);
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

    const handleUpdateNutrient = () => {
        const db = getDatabase();
        const userId = user.uid;
        const updatedGoals = { ...nutritionalGoals, [selectedNutrient]: newValue };
        update(ref(db, 'users/' + userId), { nutritionalGoals: updatedGoals })
            .then(() => {
                setNutritionalGoals(updatedGoals);
                setNewValue('');
                console.log(`${selectedNutrient} updated successfully.`);
            })
            .catch((error) => {
                console.error(`Error updating ${selectedNutrient}:`, error);
            });
    };

    const transformedNutritionalGoals = Object.entries(nutritionalGoals).map(([key, value]) => (
        <div key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
        </div>
    ));

    const renderedMeals = meals.length > 0 ? meals.map(([mealId, meal]) => (
        <div key={mealId} style={{
            border: '2px solid #FFB347', margin: '10px', padding: '10px', borderRadius: '10px'
        }}>
            <h3>{meal.name}</h3>
            {meal.foods && meal.foods.length > 0 ? (
                <ul>
                    {meal.foods.map((food, index) => (
                        <li key={index}>
                            <div>{food.key || 'Unknown'}</div>
                            <div>
                                Calories: {food.Calories || 0} | Carbs: {food.Carbs || 0}g | Fat: {food.Fat || 0}g |
                                Fiber: {food.Fiber || 0}g | Protein: {food.Protein || 0}g
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No food items in this meal.</p>
            )}
            <button onClick={() => handleDeleteMeal(mealId)}>Delete Meal</button>
        </div>
    )) : <p>No meals available.</p>;

    if (user) {
        return (
            <div className="profile-container">
                <h1 id="welcome-message">Welcome, {user.email}</h1>
                <h2 id="nutritional-header">Your Nutritional Goals:</h2>
                <div className="nutritional-goals">
                    {transformedNutritionalGoals}
                </div>
                <div className="nutrient-input">
                    <select id="select-goal" value={selectedNutrient} onChange={e => setSelectedNutrient(e.target.value)}>
                        <option className="goal-option" value="calories">Calories</option>
                        <option className="goal-option" value="carbs">Carbs</option>
                        <option className="goal-option" value="protein">Protein</option>
                        <option className="goal-option" value="fat">Fat</option>
                        <option className="goal-option" value="fiber">Fiber</option>
                    </select>
                    <div className="input-with-button">
                        <input
                            id="input-goal"
                            type="number"
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                            placeholder={`Set ${selectedNutrient} goal`}
                        />
                        <button id="update-goal" onClick={handleUpdateNutrient}>Update</button>
                    </div>
                </div>

                <div className="meals-container">
                    {renderedMeals}
                </div>

                <button onClick={handleLogout} className="logout-button">Logout</button>
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